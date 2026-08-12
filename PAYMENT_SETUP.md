# Payment Integration Setup Guide

This document explains the complete payment integration setup for JerStore using eSewa payment gateway.

## Project Structure

```
JerStore/
├── api/
│   ├── initiate-payment.js      # Vercel serverless function for payment initiation
│   └── verify-payment.js        # Vercel serverless function for payment verification
├── src/
│   ├── payment/
│   │   ├── component/
│   │   │   ├── PaymentForm.jsx      # Main payment form component
│   │   │   ├── PaymentSuccess.jsx   # Success page after payment
│   │   │   └── PaymentFailure.jsx   # Failure page if payment fails
│   │   └── utils/
│   │       └── helper.js            # Helper functions (generateUniqueId, base64Decode)
│   ├── Pages/
│   │   ├── CartContext.jsx      # Cart state management
│   │   └── CartDisplay.jsx      # Shopping cart display component
│   └── Router/
│       └── AppRouter.jsx        # Route configuration
├── server.js                    # Local development backend server
├── package.json                 # Project dependencies
├── vite.config.js              # Vite configuration with API proxy
├── .env.example                # Environment variables template
└── README.md
```

## Environment Setup

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:

- `express` - Backend server framework
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variable management
- `axios` - HTTP client for API requests
- Other frontend dependencies

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your values:

   ```env
   # Clerk Configuration (from Clerk Dashboard)
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

   # eSewa Configuration (eSewa Merchant Account)
   VITE_ESEWA_MERCHANT_ID=EPAYTEST          # Use EPAYTEST for testing
   VITE_ESEWA_SECRET=8gBm/:&EnhH.1/q        # eSewa provided secret
   VITE_ESEWA_PAYMENT_URL=https://rc-epay.esewa.com.np/api/epay/main/v2/form
   VITE_ESEWA_STATUS_URL=https://rc.esewa.com.np/api/epay/transaction/status/

   # Redirect URLs after payment (Update for production)
   VITE_SUCCESS_URL=http://localhost:5173/payment-success
   VITE_FAILURE_URL=http://localhost:5173/payment-failure

   # Backend API URL
   VITE_API_BASE_URL=http://localhost:5173
   ```

**Important Notes for eSewa Setup:**

- Create a merchant account at [eSewa](https://esewa.com.np)
- For testing, use Merchant ID: `EPAYTEST` and Secret: `8gBm/:&EnhH.1/q`
- Get your production credentials after approval

## Running the Application

### Option 1: Development (With Backend Server)

Run both frontend and backend concurrently:

```bash
npm run dev:full
```

This will start:

- **Frontend**: http://localhost:5173 (Vite dev server)
- **Backend**: http://localhost:3001 (Express server for payment APIs)

### Option 2: Frontend Only

```bash
npm run dev
```

(Backend server must be running separately on port 3001)

### Option 3: Run Backend Server Separately

In one terminal:

```bash
npm run dev:backend
```

In another terminal:

```bash
npm run dev
```

## Payment Flow

### 1. User Adds Items to Cart

- User browses products and adds items to cart
- Cart state is managed via `CartContext`

### 2. Checkout Process

- User navigates to `/cart` (CartDisplay component)
- Clicks "Proceed to Payment" button
- Redirects to `/payment` (PaymentForm component)

### 3. Payment Initiation

```
PaymentForm Component
    ↓
POST /api/initiate-payment (Server receives request)
    ↓
Server generates signature and payment data
    ↓
Returns data to frontend with payment_url
    ↓
Frontend auto-submits form to eSewa
```

**Endpoint**: `POST /api/initiate-payment`
**Request Body**:

```json
{
  "amount": 5000,
  "productId": "jersey-1692345678-abc123def",
  "productName": "Jersey Order (2 items)"
}
```

**Response**:

```json
{
  "amount": "5000",
  "total_amount": "5000",
  "transaction_uuid": "jersey-1692345678-abc123def",
  "product_code": "EPAYTEST",
  "success_url": "http://localhost:5173/payment-success",
  "failure_url": "http://localhost:5173/payment-failure",
  "signature": "base64-encoded-signature",
  "payment_url": "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
}
```

### 4. eSewa Payment Processing

- User is redirected to eSewa payment gateway
- User enters payment details and completes payment
- eSewa redirects user back to success or failure URL

### 5. Payment Verification

```
PaymentSuccess Component loads
    ↓
Extracts transaction data from URL query params
    ↓
Decodes base64 encoded data
    ↓
POST /api/verify-payment with transaction details
    ↓
Server queries eSewa status endpoint
    ↓
Returns payment status (COMPLETED or FAILED)
    ↓
Display appropriate message to user
```

**Endpoint**: `POST /api/verify-payment`
**Request Body**:

```json
{
  "product_id": "jersey-1692345678-abc123def",
  "total_amount": "5000"
}
```

**Response**:

```json
{
  "status": "COMPLETED" // or "FAILED"
}
```

## Testing the Payment

### Test eSewa Credentials

- Merchant ID: `EPAYTEST`
- Secret: `8gBm/:&EnhH.1/q`
- Payment Gateway: https://rc-epay.esewa.com.np/

### Test Payment Details

- Amount: Any amount (e.g., NPR 5000)
- Transaction UUID: Auto-generated by system

### Manual Testing Steps

1. Navigate to http://localhost:5173
2. Add items to cart
3. Go to cart and click "Proceed to Payment"
4. Payment form will display items and total
5. Click "Pay with eSewa"
6. You'll be redirected to eSewa gateway
7. Complete the test payment
8. You'll be redirected to success/failure page

## Production Deployment

### Vercel Deployment

The API routes in `/api` folder are configured for Vercel serverless functions:

1. **Update environment variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env`

2. **Update success/failure URLs:**

   ```env
   VITE_SUCCESS_URL=https://your-domain.com/payment-success
   VITE_FAILURE_URL=https://your-domain.com/payment-failure
   ```

3. **Deploy:**
   ```bash
   vercel deploy --prod
   ```

### Other Hosting Options

If not using Vercel, convert `server.js` to your hosting provider's serverless format or run as a traditional Node.js server.

## Troubleshooting

### Issue: "Failed to start payment"

- **Solution**: Check if backend server is running on port 3001
- Run: `npm run dev:backend`

### Issue: CORS errors

- **Solution**: Verify vite.config.js proxy is configured correctly
- Backend should have CORS enabled (already configured in server.js)

### Issue: Payment status check fails

- **Solution**: Verify eSewa credentials in .env file
- Check internet connection to eSewa servers

### Issue: Signature verification failed

- **Solution**: Ensure ESEWA_SECRET is correct
- Format: `total_amount,transaction_uuid,product_code`

## Key Files and Their Roles

| File                                       | Purpose                                                 |
| ------------------------------------------ | ------------------------------------------------------- |
| `src/payment/component/PaymentForm.jsx`    | Displays checkout form and initiates payment            |
| `src/payment/component/PaymentSuccess.jsx` | Handles successful payment verification                 |
| `src/payment/component/PaymentFailure.jsx` | Shows payment failure message                           |
| `src/Pages/CartContext.jsx`                | Manages cart state globally                             |
| `src/Pages/CartDisplay.jsx`                | Displays cart items and checkout button                 |
| `api/initiate-payment.js`                  | Generates payment signature and data                    |
| `api/verify-payment.js`                    | Verifies payment status with eSewa                      |
| `server.js`                                | Local development backend server                        |
| `src/payment/utils/helper.js`              | Utility functions for ID generation and base64 decoding |

## Important Security Notes

⚠️ **Never commit `.env` file to version control**

- .env is already in .gitignore
- Use .env.example as template
- Always use secure environment variables in production

⚠️ **eSewa Secret Key**

- Keep your actual merchant secret secure
- Never expose it in frontend code
- Always validate signatures on the backend

⚠️ **HTTPS Required**

- Always use HTTPS URLs for production
- eSewa may not accept HTTP redirect URLs in production

## Additional Resources

- [eSewa Documentation](https://developer.esewa.com.np/)
- [Express.js Guide](https://expressjs.com/)
- [Vite Configuration](https://vitejs.dev/config/)
- [React Router Documentation](https://reactrouter.com/)

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review environment variables configuration
3. Check browser console for error messages
4. Review server logs for backend errors
