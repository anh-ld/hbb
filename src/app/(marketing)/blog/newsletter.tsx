"use client";

import { createNewsletterSubscription } from "./_action";
import { Button, Input } from "@/ui/elements";
import { useRef } from "react";
import { useFormState } from "react-dom";

const initialState = { message: "", state: 'normal' };

const BlogNewsletter = () => {
  const [state, action] = useFormState(createNewsletterSubscription<typeof initialState>, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="mask-corner-sm lg:mask-corner-md flex items-center justify-center bg-[--dark-1] px-5 py-16 text-[--light-1] lg:col-span-3">
      <div>
        <h3 className="h4 mb-8 text-center lg:max-w-[800px]">Cùng Horos cập nhật tin tức tử vi dành cho riêng bạn!</h3>
        <div className="text-center">
          <form className="mb-4 flex flex-col gap-4 lg:flex-row" action={action} ref={formRef}>
            <Input
              label="Email của bạn"
              name="email"
              type="email"
              id="newsletter-email"
              required
              className="lg:flex-1 [&_input]:bg-[--dark-1] [&_label]:bg-[--dark-1]"
              placeholder="email-cua-ban@gmail.com"
            />

            <Button type="submit" color="teal" className="newsletter__submit">
              Đăng ký thư
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogNewsletter;
