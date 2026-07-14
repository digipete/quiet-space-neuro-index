import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ClaimSpaceModalProps {
  listingId: string;
  listingTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  claimant_name: string;
  claimant_email: string;
  claimant_role: string;
  website: string;
  verification_note: string;
  phone_number: string; // honeypot
}

const ROLE_OPTIONS = [
  'Space Owner',
  'General Manager',
  'Marketing Manager',
  'Operations Manager',
  'Other',
] as const;

const initialFormState: FormState = {
  claimant_name: '',
  claimant_email: '',
  claimant_role: '',
  website: '',
  verification_note: '',
  phone_number: '',
};

export function ClaimSpaceModal({
  listingId,
  listingTitle,
  isOpen,
  onClose,
}: ClaimSpaceModalProps) {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successEmail, setSuccessEmail] = useState<string | null>(null);

  const sanitize = (value: string) =>
    DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.claimant_name.trim()) {
      next.claimant_name = 'Your name is required.';
    }

    if (!form.claimant_email.trim()) {
      next.claimant_email = 'Your email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.claimant_email.trim())) {
      next.claimant_email = 'Please enter a valid email address.';
    }

    if (!form.claimant_role) {
      next.claimant_role = 'Please select your role.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRoleChange = (value: string) => {
    setForm((prev) => ({ ...prev, claimant_role: value }));
    if (errors.claimant_role) {
      setErrors((prev) => ({ ...prev, claimant_role: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check — bot filled the hidden field, silently abort
    if (form.phone_number) {
      onClose();
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('space_claims').insert({
        listing_id: listingId,
        claimant_name: sanitize(form.claimant_name.trim()),
        claimant_email: sanitize(form.claimant_email.trim()),
        claimant_role: sanitize(form.claimant_role),
        website: form.website.trim() ? sanitize(form.website.trim()) : null,
        verification_note: form.verification_note.trim()
          ? sanitize(form.verification_note.trim())
          : null,
        status: 'pending',
      });

      if (error) throw error;

      setSuccessEmail(form.claimant_email.trim());
    } catch (err) {
      console.error('ClaimSpaceModal submit error:', err);
      toast({
        title: 'Something went wrong',
        description:
          "We couldn't submit your claim right now. Please try again in a moment.",
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setForm(initialFormState);
    setErrors({});
    setSuccessEmail(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="sm:max-w-lg">
        {successEmail ? (
          <>
            <DialogHeader>
              <DialogTitle>Claim submitted</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground mt-2">
              Thanks! We'll verify your claim within 3 business days and be in touch at{' '}
              <span className="font-medium text-foreground">{successEmail}</span>.
            </p>
            <DialogFooter className="mt-4">
              <Button onClick={handleClose}>Close</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Claim this space</DialogTitle>
              <DialogDescription>
                Are you the owner or manager of{' '}
                <span className="font-medium text-foreground">{listingTitle}</span>?
                Fill in the form below and we'll verify your connection to this listing.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} noValidate className="space-y-4 mt-2">
              {/* Honeypot — visually hidden from real users */}
              <div
                aria-hidden="true"
                tabIndex={-1}
                style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
              >

                <label htmlFor="phone_number">Phone</label>
                <input
                  id="phone_number"
                  name="phone_number"
                  type="text"
                  value={form.phone_number}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              {/* Claimant name */}
              <div className="space-y-1">
                <Label htmlFor="claimant_name">
                  Your name <span aria-hidden="true" className="text-destructive">*</span>
                </Label>
                <Input
                  id="claimant_name"
                  name="claimant_name"
                  type="text"
                  autoComplete="name"
                  value={form.claimant_name}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.claimant_name}
                  aria-describedby={errors.claimant_name ? 'claimant_name_error' : undefined}
                />
                {errors.claimant_name && (
                  <p id="claimant_name_error" className="text-xs text-destructive">
                    {errors.claimant_name}
                  </p>
                )}
              </div>

              {/* Claimant email */}
              <div className="space-y-1">
                <Label htmlFor="claimant_email">
                  Your email <span aria-hidden="true" className="text-destructive">*</span>
                </Label>
                <Input
                  id="claimant_email"
                  name="claimant_email"
                  type="email"
                  autoComplete="email"
                  value={form.claimant_email}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.claimant_email}
                  aria-describedby={errors.claimant_email ? 'claimant_email_error' : undefined}
                />
                {errors.claimant_email && (
                  <p id="claimant_email_error" className="text-xs text-destructive">
                    {errors.claimant_email}
                  </p>
                )}
              </div>

              {/* Claimant role */}
              <div className="space-y-1">
                <Label htmlFor="claimant_role">
                  Your role <span aria-hidden="true" className="text-destructive">*</span>
                </Label>
                <Select
                  value={form.claimant_role}
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger
                    id="claimant_role"
                    aria-required="true"
                    aria-invalid={!!errors.claimant_role}
                    aria-describedby={errors.claimant_role ? 'claimant_role_error' : undefined}
                  >
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLE_OPTIONS.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.claimant_role && (
                  <p id="claimant_role_error" className="text-xs text-destructive">
                    {errors.claimant_role}
                  </p>
                )}
              </div>

              {/* Website */}
              <div className="space-y-1">
                <Label htmlFor="website">Official website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  autoComplete="url"
                  placeholder="https://example.com"
                  value={form.website}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground">
                  Providing your website helps us verify your connection to this space.
                </p>
              </div>

              {/* Verification note */}
              <div className="space-y-1">
                <Label htmlFor="verification_note">How can we verify you?</Label>
                <Textarea
                  id="verification_note"
                  name="verification_note"
                  rows={3}
                  placeholder="Tell us how we can verify you represent this space"
                  value={form.verification_note}
                  onChange={handleChange}
                />
              </div>

              <DialogFooter className="gap-2 pt-2">
                <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting…' : 'Submit claim'}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ClaimSpaceModal;
