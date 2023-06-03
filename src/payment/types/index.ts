export class MakePaymentResponse {
  id: string;
  status: string;
  amount: {
    value: string;
    currency: string;
  };
  description: string;
  'recipient': {
    account_id: string;
    gateway_id: string;
  };
  created_at: string;
  confirmation: {
    type: string;
    confirmation_url: string;
  };
  test: boolean;
  paid: boolean;
  refundable: boolean;
  metadata: Record<string, unknown>;
}
