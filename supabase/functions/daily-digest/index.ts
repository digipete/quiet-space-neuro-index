import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const CRON_SECRET = Deno.env.get('CRON_SECRET');
const DIGEST_TO = 'hello@quietspace.club';
const PROJECT_REF = 'zbylujrthjyryngdbiwv';

// Dashboard deep-link helpers
const submissionsTableUrl = `https://supabase.com/dashboard/project/${PROJECT_REF}/database/tables?table=space_submissions`;
const claimsTableUrl     = `https://supabase.com/dashboard/project/${PROJECT_REF}/database/tables?table=space_claims`;

function sqlLink(table: string, id: string): string {
  const query = encodeURIComponent(`SELECT * FROM ${table} WHERE id = '${id}';`);
  return `https://supabase.com/dashboard/project/${PROJECT_REF}/sql/new?content=${query}`;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  if (h > 0) return `${h}h ${m}m ago`;
  return `${m}m ago`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

// ── Email HTML builders ───────────────────────────────────────────────────────

function submissionBlock(s: Record<string, unknown>, index: number): string {
  const features = Array.isArray(s.neuro_features) ? (s.neuro_features as string[]).join(', ') : '—';
  return `
    <tr>
      <td style="padding:16px 0;border-bottom:1px solid #e5e7eb;">
        <p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#111827;">
          ${index}. ${s.space_name}
        </p>
        <p style="margin:0 0 2px;font-size:13px;color:#6b7280;">
          📍 ${s.location}
        </p>
        <p style="margin:0 0 2px;font-size:13px;color:#6b7280;">
          👤 ${s.contact_name} &lt;${s.contact_email}&gt;
          ${s.contact_phone ? ` · 📞 ${s.contact_phone}` : ''}
        </p>
        ${s.website ? `<p style="margin:0 0 2px;font-size:13px;color:#6b7280;">🌐 <a href="${s.website}" style="color:#7c3aed;">${s.website}</a></p>` : ''}
        <p style="margin:0 0 2px;font-size:13px;color:#6b7280;">
          🕐 Submitted ${timeAgo(s.created_at as string)} (${formatDate(s.created_at as string)})
        </p>
        ${s.description ? `
        <p style="margin:8px 0 4px;font-size:13px;font-weight:500;color:#374151;">Description:</p>
        <p style="margin:0 0 8px;font-size:13px;color:#4b5563;background:#f9fafb;padding:8px;border-radius:6px;">${s.description}</p>
        ` : ''}
        ${features !== '—' ? `
        <p style="margin:4px 0 2px;font-size:13px;color:#6b7280;">
          ✅ Neuro features: <span style="color:#374151;">${features}</span>
        </p>` : ''}
        ${s.capacity ? `<p style="margin:2px 0;font-size:13px;color:#6b7280;">👥 Capacity: ${s.capacity}</p>` : ''}
        ${s.pricing  ? `<p style="margin:2px 0;font-size:13px;color:#6b7280;">💰 Pricing: ${s.pricing}</p>` : ''}
        ${s.hours    ? `<p style="margin:2px 0;font-size:13px;color:#6b7280;">🕐 Hours: ${s.hours}</p>` : ''}
        ${s.notes    ? `<p style="margin:8px 0 2px;font-size:13px;color:#6b7280;">📝 Notes: ${s.notes}</p>` : ''}
        <p style="margin:10px 0 0;">
          <a href="${sqlLink('space_submissions', s.id as string)}"
             style="display:inline-block;padding:6px 12px;background:#7c3aed;color:#fff;border-radius:6px;font-size:12px;text-decoration:none;">
            View record in Supabase →
          </a>
        </p>
      </td>
    </tr>`;
}

function claimBlock(c: Record<string, unknown>, index: number): string {
  const listing = c.listings as { title: string; location: string } | null;
  return `
    <tr>
      <td style="padding:16px 0;border-bottom:1px solid #e5e7eb;">
        <p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#111827;">
          ${index}. Claim for: ${listing?.title ?? 'Unknown listing'}
        </p>
        <p style="margin:0 0 2px;font-size:13px;color:#6b7280;">
          📍 ${listing?.location ?? '—'}
        </p>
        <p style="margin:0 0 2px;font-size:13px;color:#6b7280;">
          👤 ${c.claimant_name} &lt;${c.claimant_email}&gt;
        </p>
        <p style="margin:0 0 2px;font-size:13px;color:#6b7280;">
          🏷️ Role: ${c.claimant_role}
        </p>
        ${c.website ? `<p style="margin:0 0 2px;font-size:13px;color:#6b7280;">🌐 <a href="${c.website as string}" style="color:#7c3aed;">${c.website}</a></p>` : ''}
        <p style="margin:0 0 2px;font-size:13px;color:#6b7280;">
          🕐 Claimed ${timeAgo(c.created_at as string)} (${formatDate(c.created_at as string)})
        </p>
        ${c.verification_note ? `
        <p style="margin:8px 0 4px;font-size:13px;font-weight:500;color:#374151;">Verification note:</p>
        <p style="margin:0 0 8px;font-size:13px;color:#4b5563;background:#f9fafb;padding:8px;border-radius:6px;">${c.verification_note}</p>
        ` : ''}
        <p style="margin:10px 0 0;">
          <a href="${sqlLink('space_claims', c.id as string)}"
             style="display:inline-block;padding:6px 12px;background:#7c3aed;color:#fff;border-radius:6px;font-size:12px;text-decoration:none;">
            View record in Supabase →
          </a>
        </p>
      </td>
    </tr>`;
}

function buildEmail(
  submissions: Record<string, unknown>[],
  claims: Record<string, unknown>[],
  digestDate: string,
): string {
  const submissionsSection = submissions.length > 0 ? `
    <tr>
      <td style="padding:24px 0 8px;">
        <h2 style="margin:0 0 4px;font-size:18px;color:#7c3aed;">
          🏢 New Space Submissions (${submissions.length})
        </h2>
        <p style="margin:0 0 8px;font-size:13px;color:#6b7280;">
          <a href="${submissionsTableUrl}" style="color:#7c3aed;">View all in Supabase →</a>
        </p>
      </td>
    </tr>
    ${submissions.map((s, i) => submissionBlock(s, i + 1)).join('')}
  ` : '';

  const claimsSection = claims.length > 0 ? `
    <tr>
      <td style="padding:24px 0 8px;">
        <h2 style="margin:0 0 4px;font-size:18px;color:#059669;">
          🔖 Space Claims (${claims.length})
        </h2>
        <p style="margin:0 0 8px;font-size:13px;color:#6b7280;">
          <a href="${claimsTableUrl}" style="color:#059669;">View all in Supabase →</a>
        </p>
      </td>
    </tr>
    ${claims.map((c, i) => claimBlock(c, i + 1)).join('')}
  ` : '';

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#5b21b6);padding:28px 32px;">
              <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">🧠 Quiet Space Club</p>
              <p style="margin:4px 0 0;font-size:14px;color:#e9d5ff;">Daily Activity Digest · ${digestDate}</p>
            </td>
          </tr>

          <!-- Summary banner -->
          <tr>
            <td style="background:#f5f3ff;padding:16px 32px;border-bottom:1px solid #e5e7eb;">
              <p style="margin:0;font-size:14px;color:#5b21b6;font-weight:500;">
                ${submissions.length} new submission${submissions.length !== 1 ? 's' : ''} &nbsp;·&nbsp;
                ${claims.length} new claim${claims.length !== 1 ? 's' : ''}
                &nbsp; in the last 24 hours
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:8px 32px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${submissionsSection}
                ${claimsSection}
                <tr>
                  <td style="padding-top:24px;border-top:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
                      Quiet Space Club · This digest runs daily at 8am UTC<br>
                      <a href="https://supabase.com/dashboard/project/${PROJECT_REF}/database/tables" style="color:#7c3aed;">Open Supabase Dashboard</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Handler ───────────────────────────────────────────────────────────────────

serve(async (req) => {
  // Optional secret check — skip if CRON_SECRET not set (internal Supabase calls)
  if (CRON_SECRET) {
    const auth = req.headers.get('x-cron-secret');
    if (auth !== CRON_SECRET) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Everything created in the last 24 hours
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const [{ data: submissions }, { data: claims }] = await Promise.all([
      supabase
        .from('space_submissions')
        .select('*')
        .gte('created_at', since)
        .order('created_at', { ascending: false }),
      supabase
        .from('space_claims')
        .select('*, listings(title, location)')
        .gte('created_at', since)
        .order('created_at', { ascending: false }),
    ]);

    const newSubmissions = submissions ?? [];
    const newClaims      = claims ?? [];

    // Nothing to report — exit quietly
    if (newSubmissions.length === 0 && newClaims.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No new activity in the last 24 hours — no email sent.' }),
        { headers: { 'Content-Type': 'application/json' } },
      );
    }

    const digestDate = new Date().toLocaleDateString('en-GB', {
      timeZone: 'Europe/London',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const subject =
      newSubmissions.length > 0 && newClaims.length > 0
        ? `QSC Digest: ${newSubmissions.length} submission${newSubmissions.length !== 1 ? 's' : ''} + ${newClaims.length} claim${newClaims.length !== 1 ? 's' : ''}`
        : newSubmissions.length > 0
        ? `QSC Digest: ${newSubmissions.length} new space submission${newSubmissions.length !== 1 ? 's' : ''}`
        : `QSC Digest: ${newClaims.length} new space claim${newClaims.length !== 1 ? 's' : ''}`;

    const html = buildEmail(newSubmissions, newClaims, digestDate);

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Quiet Space Club <hello@quietspace.club>',
        to: [DIGEST_TO],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend error ${res.status}: ${err}`);
    }

    const resendData = await res.json();
    return new Response(
      JSON.stringify({
        message: 'Digest sent',
        email_id: resendData.id,
        submissions: newSubmissions.length,
        claims: newClaims.length,
      }),
      { headers: { 'Content-Type': 'application/json' } },
    );

  } catch (err) {
    console.error('daily-digest error:', err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
});
