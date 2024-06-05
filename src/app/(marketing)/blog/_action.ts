"use server";

export const createNewsletterSubscription = async <T = unknown>(_: T, formData: FormData) => {
  const email = formData.get("email") as string;
  const data = { email };

  /* mock action, no operation */

  return { state: 'normal', message: '' }
};
