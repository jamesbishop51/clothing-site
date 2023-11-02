import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '~/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { total, cart, email, address, city, state, postalCode, firstName, lastName } = req.body;
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['wildweststitchery@gmail.com'],
      subject: 'Order Details',
      text: 'Order Details',
      react: EmailTemplate({
        firstName,
        lastName,
        total,
        cart,
        email,
        address,
        city,
        state,
        postalCode
      }),
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
