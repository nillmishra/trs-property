# API Integration Summary

## ✅ Changes Completed

### 1. **Dual Base URL Configuration**
- **File:** `src/libs/based-url.js`
- **Old Base URL:** `https://realestate123.pythonanywhere.com` (ACTIVE - for existing APIs)
- **New Base URL:** `https://trs-property-backend.onrender.com` (ACTIVE - for new APIs)
- **Status:** ✅ Both URLs active, no existing functionality broken

---

### 2. **Dual API Instance Setup**
- **File:** `src/redux/createAPI.js`
- **Status:** ✅ Complete

#### Two API Instances:
1. **`realStateAPI`** - Uses old base URL for existing endpoints
2. **`newRealStateAPI`** - Uses new base URL for new endpoints

Both API instances are registered in Redux store with proper middleware configuration.

---

### 3. **Authentication API - DUAL MODE**
- **File:** `src/service/authApi.js`
- **Status:** ✅ Complete - Both old and new APIs active

#### OLD Endpoints (Using Old Base URL):
| Endpoint | Hook | Description |
|----------|------|-------------|
| `authentication/v1/user/send_otp/` | `useSendOtpMutation` | Send OTP (old) |
| `authentication/v1/user/verify_otp/` | `useVerifyOtpMutation` | Verify OTP (old) |
| `authentication/v1/user/register/` | `useSignUpMutation` | Register user (old) |

#### NEW Endpoints (Using New Base URL):
| Endpoint | Hook | Description |
|----------|------|-------------|
| `POST /api/auth/signup` | `useSignupSendOtpMutation` | Send OTP for signup |
| `POST /api/auth/signup/verify-otp` | `useSignupVerifyOtpMutation` | Verify OTP and complete signup |
| `POST /api/auth/send-otp` | `useLoginSendOtpMutation` | Send OTP for login |
| `POST /api/auth/verify-otp` | `useLoginVerifyOtpMutation` | Verify OTP and login |
| `GET /api/auth/me` | `useGetCurrentUserQuery` | Get current user info |

**✅ All existing code continues to work without changes!**

---

### 4. **Property API - DUAL MODE**
- **File:** `src/service/propertyApi.js`
- **Status:** ✅ Complete - Both old and new APIs active

#### OLD Endpoints (Using Old Base URL):
| Endpoint | Hook | Description |
|----------|------|-------------|
| `property/view/` | `useGetPropertyQuery` | Get all properties (old) |
| `property/customer_view/` | `useGetCustomerPropertyQuery` | Get user properties (old) |
| `property/property_detail/?property_id=` | `useGetSinglePropertyQuery` | Get single property (old) |
| `property/store/` | `useAddAndEditBothPropertyMutation` | Create/Update property (old) |
| `property/property_image_store/` | `useUploadPropertyImageMutation` | Upload images (old) |
| `property/property_document_store/` | `useUploadPropertyDocumentMutation` | Upload documents (old) |
| `property/customer_delete/:id` | `useDeletePropertyMutation` | Delete property (old) |

#### NEW Endpoints (Using New Base URL):
| Endpoint | Hook | Description |
|----------|------|-------------|
| `GET /api/properties` | `useGetAllPropertiesQuery` | Get all properties with filters |
| `GET /api/properties/:id` | `useGetPropertyByIdQuery` | Get single property details |
| `POST /api/properties` | `useCreatePropertyMutation` | Create property (with images/docs) |
| `GET /api/properties/user/my-properties` | `useGetMyPropertiesQuery` | Get user's own properties |

**✅ All existing code continues to work without changes!**

---

### 5. **Redux Store Updated**
- **File:** `src/redux/store.js`
- **Status:** ✅ Complete

Both API reducers and middlewares registered:
```javascript
- realStateAPI (old endpoints)
- newRealStateAPI (new endpoints)
```

---

### 6. **Other API Services**
- **Status:** ✅ Unchanged and working

The following API services continue to use the old base URL without any changes:
- `favoriteApi.js` - Favorite/Wishlist APIs
- `profileApi.js` - User profile APIs
- `buyRequirementApi.js` - Buy requirement APIs
- `notificationApi.js` - Notification APIs
- `tourApi.js` - Property tour APIs

---

### 5. **New Files Created**

#### a) API Integration Guide
- **File:** `API_INTEGRATION_GUIDE.md` (root directory)
- **Content:** 
  - Complete usage guide for all APIs
  - Authentication flow examples
  - Property CRUD examples
  - Error handling
  - Backward compatibility notes

#### b) API Helper Utilities
- **File:** `src/utils/apiHelpers.js`
- **Functions:**
  - `createPropertyFormData()` - Build FormData for property creation
  - `buildPropertySearchParams()` - Build search query params
  - `isValidPhoneNumber()` - Validate phone numbers
  - `isValidOTP()` - Validate OTP
  - `formatPrice()` - Format prices in Indian format
  - `formatPriceShort()` - Format prices in Lakhs/Crores
  - `getErrorMessage()` - Extract error messages from API responses
  - `validatePropertyData()` - Validate property data before submission
  - `formatDate()` - Format dates
  - `getRelativeTime()` - Get relative time (e.g., "2 days ago")
  - Constants: `PROPERTY_TYPES`, `PROPERTY_CATEGORIES`, `POSSESSION_STATUS`, `USER_ROLES`

#### c) API Usage Examples
- **File:** `src/examples/apiUsageExamples.jsx`
- **Components:**
  - `SignupExample` - Complete signup flow with OTP
  - `LoginExample` - Complete login flow with OTP
  - `PropertyListExample` - Property listing with filters and pagination
  - `PropertyDetailExample` - Single property details
  - `CreatePropertyExample` - Create property with images/documents
  - `MyPropertiesExample` - User's property list
  - `CurrentUserExample` - Display current user info

---

## 🔄 API Mapping (Old vs New)

### Authentication

| Old API | New API | Notes |
|---------|---------|-------|
| `authentication/v1/user/send_otp/` | `/api/auth/send-otp` | Login flow |
| `authentication/v1/user/verify_otp/` | `/api/auth/verify-otp` | Login verification |
| `authentication/v1/user/register/` | `/api/auth/signup` + `/api/auth/signup/verify-otp` | Two-step signup |
| N/A | `/api/auth/me` | New endpoint for current user |

### Properties

| Old API | New API | Notes |
|---------|---------|-------|
| `property/view/` | `/api/properties` | Public properties with filters |
| `property/customer_view/` | `/api/properties/user/my-properties` | User's properties |
| `property/property_detail/?property_id=` | `/api/properties/:id` | Single property |
| `property/store/` | `/api/properties` | Create property (multipart/form-data) |
| `property/customer_update/` | Not implemented yet | Update property |
| `property/customer_delete/:id` | Not implemented yet | Delete property |
| `property/property_image_store/` | Merged into `/api/properties` | Images uploaded with property |
| `property/property_document_store/` | Merged into `/api/properties` | Documents uploaded with property |

---

## 📋 What's NOT Implemented (Yet)

The following endpoints from the API documentation are **NOT implemented** as per your request:

### Admin APIs (Not Added)
- `GET /api/properties/admin/pending` - Get pending properties
- `PATCH /api/properties/:id/approve` - Approve single property
- `PATCH /api/properties/admin/bulk-approve` - Bulk approve properties
- `POST /api/properties/bulk-upload` - Bulk upload via Excel/CSV

### Property APIs (Not Added)
- Update property endpoint
- Delete property endpoint

---

## 🔧 How to Use

### 1. **Authentication Flow**

```javascript
// Login
const [loginSendOtp] = useLoginSendOtpMutation();
const [loginVerifyOtp] = useLoginVerifyOtpMutation();
const dispatch = useDispatch();

// Step 1: Send OTP
const result1 = await loginSendOtp({ phone: "9876543210" }).unwrap();

// Step 2: Verify OTP
const result2 = await loginVerifyOtp({ phone: "9876543210", otp: "000000" }).unwrap();
dispatch(setToken(result2.data.token));
dispatch(setUser(result2.data.user));
```

### 2. **Get Properties**

```javascript
const { data } = useGetAllPropertiesQuery({
    page: 1,
    limit: 10,
    city: "Indore",
    propertyType: "flat",
    minPrice: 5000000,
    maxPrice: 10000000
});

const properties = data?.data?.properties;
const pagination = data?.data?.pagination;
```

### 3. **Create Property**

```javascript
const [createProperty] = useCreatePropertyMutation();

const formData = createPropertyFormData(
    {
        title: "Luxury Villa",
        propertyType: "villa",
        category: "residential",
        city: "Indore",
        price: 15000000,
        bedrooms: 4
    },
    imageFiles, // FileList
    documentFiles // FileList
);

const result = await createProperty(formData).unwrap();
```

---

## 📱 Testing

### Development OTP
In development mode, the OTP is fixed as: **`000000`**

### Test User
Create a test user:
```javascript
// Signup
await signupSendOtp({
    fullName: "Test User",
    phone: "9876543210",
    role: "customer"
});

// Verify with OTP: 000000
await signupVerifyOtp({
    fullName: "Test User",
    phone: "9876543210",
    otp: "000000",
    role: "customer"
});
```

---

## 🔐 Authorization

All protected endpoints automatically include the JWT token from Redux state:

```javascript
// Token is automatically added to headers by RTK Query
// No manual configuration needed

// Token stored in: state.auth.token
// Set by: dispatch(setToken(token))
```

---

## 📚 Documentation Files

1. **API_INTEGRATION_GUIDE.md** - Complete API usage guide
2. **src/utils/apiHelpers.js** - Helper functions and utilities
3. **src/examples/apiUsageExamples.jsx** - React component examples
4. **INTEGRATION_SUMMARY.md** - This file

---

## ⚠️ Important Notes

1. **Dual API Setup**: The application now runs BOTH old and new APIs simultaneously
   - Old APIs use: `https://realestate123.pythonanywhere.com`
   - New APIs use: `https://trs-property-backend.onrender.com`

2. **Zero Breaking Changes**: All existing code continues to work exactly as before

3. **OTP in Development**: In the new API, OTP is fixed as `000000` for testing purposes

4. **File Uploads**: 
   - Old API: Separate endpoints for images and documents
   - New API: Combined upload with property creation

5. **Property Status**: 
   - Old API: Uses existing status system
   - New API: Properties created with `pending` status, require admin approval

6. **Easy Migration**: You can gradually migrate from old hooks to new hooks at your own pace

---

## 🚀 Next Steps

To start using the new APIs:

1. **Import the new hooks** in your components
2. **Follow the examples** in `src/examples/apiUsageExamples.jsx`
3. **Use helper functions** from `src/utils/apiHelpers.js`
4. **Handle responses** according to the new structure:
   ```javascript
   {
       success: true,
       message: "...",
       data: { ... }
   }
   ```

---

## 🐛 Troubleshooting

### Issue: Token not being sent
**Solution:** Ensure token is set in Redux:
```javascript
import { useSelector } from 'react-redux';
const token = useSelector(state => state.auth.token);
```

### Issue: CORS errors
**Solution:** Check backend CORS configuration allows your frontend domain

### Issue: File upload fails
**Solution:** Ensure FormData is created correctly using `createPropertyFormData()` helper

---

**Integration Completed:** February 15, 2026  
**Status:** ✅ Ready for Testing
