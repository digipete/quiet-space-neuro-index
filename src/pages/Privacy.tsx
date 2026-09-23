import { SEO } from '@/components/SEO';

const Privacy = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Privacy Policy"
      description="How Quiet Space Club collects, uses and protects personal data on the NeuroIndex workspace directory, and the rights you have under UK GDPR."
      keywords="privacy policy, data protection, UK GDPR, Quiet Space Club privacy"
      url="https://index.quietspace.club/privacy/"
    />

    <div className="container mx-auto px-4 py-14 md:py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated 23 September 2026</p>

        <div className="space-y-8 text-foreground/85 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Who we are</h2>
            <p>
              NeuroIndex is operated by Quiet Space Club, based in London, United Kingdom. We are the data
              controller for personal data collected through this site. You can reach us at{' '}
              <a href="mailto:hello@quietspace.club" className="text-primary underline underline-offset-2">
                hello@quietspace.club
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">What we collect</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                <strong>Contact enquiries.</strong> Your name, email address and message when you use the contact
                form or email us.
              </li>
              <li>
                <strong>Workspace submissions.</strong> Details about a space you submit, and the contact details
                of the person submitting it.
              </li>
              <li>
                <strong>Account data.</strong> For administrators only: an email address and authentication
                credentials handled by our hosting provider.
              </li>
              <li>
                <strong>Technical data.</strong> Anonymous usage data such as pages visited and approximate
                region, used to understand what is useful. We do not build advertising profiles.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Why we use it</h2>
            <p>
              We use contact details to reply to you, submission data to assess and publish workspace listings,
              and technical data to maintain and improve the site. Our lawful bases are legitimate interests
              (responding to enquiries, running the directory) and consent where you have given it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Who we share it with</h2>
            <p>
              We do not sell personal data. We share it only with the service providers who run this site on our
              behalf: our hosting and database provider, and our email delivery provider. Where a workspace you
              have enquired about needs to respond, we pass on only what is necessary for them to reply.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">How long we keep it</h2>
            <p>
              Contact enquiries are kept for up to two years. Workspace submission records are kept for as long as
              the listing is live, and for two years afterwards. You can ask us to delete your data sooner.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Your rights</h2>
            <p>
              Under UK GDPR you can ask for a copy of your data, ask us to correct or delete it, object to our
              processing, or ask us to restrict it. Email{' '}
              <a href="mailto:hello@quietspace.club" className="text-primary underline underline-offset-2">
                hello@quietspace.club
              </a>{' '}
              and we will respond within one month. If you are unhappy with our response you can complain to the
              Information Commissioner's Office at{' '}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                ico.org.uk
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Cookies</h2>
            <p>
              We use only the cookies and local storage needed to keep the site working and to keep an
              administrator signed in. We do not use advertising or cross-site tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Changes</h2>
            <p>
              If we change this policy we will update the date at the top of this page. Material changes will be
              noted on the site.
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>
);

export default Privacy;
