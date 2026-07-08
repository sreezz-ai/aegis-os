import { useState } from "react";
import type { FormEvent } from "react";
import { FiSend, FiLock, FiCheckCircle } from "react-icons/fi";
import { SEO } from "@/components/seo/SEO";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { contactService } from "@/services/contactService";
import type { ContactPayload } from "@/services/contactService";

type FormErrors = Partial<Record<keyof ContactPayload, string>>;

const initialForm: ContactPayload = { name: "", email: "", message: "" };

export function ContactPage(): JSX.Element {
  const [form, setForm] = useState<ContactPayload>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [otp, setOtp] = useState("");

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email.";
    if (!form.message.trim()) nextErrors.message = "Message can't be empty.";
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setResultMessage(null);
    const result = await contactService.send(form);
    setResultMessage(result.message);
    setIsSubmitting(false);
    if (result.success) setForm(initialForm);
  }

  function handleUnlock(event: FormEvent): void {
    event.preventDefault();
    if (otp.trim().length === 6) {
      setIsUnlocked(true);
    }
  }

  return (
    <>
      <SEO title="Contact" description="Get in touch with Sreelesh SK." path="/contact" />

      <Section className="pb-0">
        <PageHeader
          eyebrow="Contact"
          title="Let's talk"
          description="This form is a mock endpoint for now — nothing is sent yet — but the UI and validation are real."
        />
      </Section>

      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <Card padding="lg">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <Input
                label="Name"
                name="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                error={errors.name}
                autoComplete="name"
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                error={errors.email}
                autoComplete="email"
              />
              <Textarea
                label="Message"
                name="message"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                error={errors.message}
              />
              <Button type="submit" disabled={isSubmitting} icon={<FiSend size={14} />}>
                {isSubmitting ? "Sending..." : "Send message"}
              </Button>
              {resultMessage && (
                <p role="status" className="flex items-center gap-2 text-xs text-text-muted">
                  <FiCheckCircle size={13} color="var(--color-success)" /> {resultMessage}
                </p>
              )}
            </form>
          </Card>

          <Card padding="lg">
            <div className="mb-4 flex items-center gap-2">
              <FiLock size={16} color="var(--color-accent)" aria-hidden="true" />
              <h3 className="font-display text-base font-semibold">Unlock direct contact details</h3>
            </div>
            <p className="mb-4 text-sm text-text-muted">
              Enter any 6-digit code to preview the unlock flow — this is a UI demonstration, not a real
              verification system.
            </p>
            {!isUnlocked ? (
              <form onSubmit={handleUnlock} className="flex flex-col gap-3">
                <Input
                  label="Verification code"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  placeholder="000000"
                  inputMode="numeric"
                />
                <Button type="submit" variant="ghost">
                  Unlock
                </Button>
              </form>
            ) : (
              <div className="rounded-lg border border-border-soft p-4 font-mono text-sm text-text-primary">
                hello@example.com
              </div>
            )}
          </Card>
        </div>
      </Section>
    </>
  );
}
