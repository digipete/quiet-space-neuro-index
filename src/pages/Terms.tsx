import { SEO } from '@/components/SEO';

const Terms = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Terms of Service"
      description="The terms that apply when you use the NeuroIndex workspace directory, submit a space for assessment, or list a workspace with Quiet Space Club."
      keywords="terms of service, terms and conditions, workspace listing terms, Quiet Space Club"
      url="https://index.quietspace.club/terms/"
    />

    <div className="container mx-auto px-4 py-14 md:py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated 23 September 2026</p>

        <div className="space-y-8 text-foreground/85 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">These terms</h2>
            <p>
              NeuroIndex is operated by Quiet Space Club, London, United Kingdom. By using this site you agree to
              these terms. If you do not agree, please do not use the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">What NeuroIndex is</h2>
            <p>
              NeuroIndex is a directory of workspaces assessed for neuro-inclusion. We publish a Neuro Index score
              and a written sensory profile for each listed space. We are not the operator of those spaces, we do
              not take bookings on their behalf, and we are not a party to any agreement you enter into with them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Scores and assessments</h2>
            <p>
              A Neuro Index score reflects our assessment of a space at a point in time against our published
              criteria. It is an informed opinion, not a certification of fitness for any individual, and spaces
              change. Always visit a space yourself before committing to it. Where a space has changed materially
              since assessment, tell us and we will review the listing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Listings and submissions</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                By submitting a space you confirm you are authorised to do so and that the information you give is
                accurate.
              </li>
              <li>
                You grant us permission to publish the submitted details and images on this site, and to use them
                in related material about the index.
              </li>
              <li>
                We decide whether to list a space, and may decline, amend or remove a listing — including where
                information proves inaccurate or the space no longer meets our criteria.
              </li>
              <li>Paid assessment and listing terms, including fees and renewal, are set out at the point of purchase.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Guidance on this site is not advice</h2>
            <p>
              Our guides describe UK law and good practice in general terms. They are not legal, medical or
              occupational health advice, and should not be relied on as such. Take professional advice on your own
              circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Acceptable use</h2>
            <p>
              Do not misuse the site: no attempts to disrupt it, no automated scraping that degrades service, no
              submitting false listings, and no using our contact forms to send unsolicited or abusive messages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Our content</h2>
            <p>
              The text, scores, assessment methodology and design of this site belong to Quiet Space Club. You may
              quote and link to our pages with attribution. You may not republish substantial parts of them without
              our permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Liability</h2>
            <p>
              We provide the site with reasonable care but make no guarantee that it is uninterrupted or
              error-free. To the extent permitted by law, we are not liable for loss arising from your use of a
              listed workspace or from reliance on information published here. Nothing in these terms limits
              liability that cannot lawfully be limited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Governing law</h2>
            <p>
              These terms are governed by the law of England and Wales, and the courts of England and Wales have
              exclusive jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Contact</h2>
            <p>
              Questions about these terms:{' '}
              <a href="mailto:hello@quietspace.club" className="text-primary underline underline-offset-2">
                hello@quietspace.club
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>
);

export default Terms;
