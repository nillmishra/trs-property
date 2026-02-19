# 🔄 Dual API Setup - Migration Guide

## Overview

Your application now supports **BOTH** old and new APIs simultaneously. This means:

✅ **No breaking changes** - All existing code works as-is  
✅ **Gradual migration** - Switch to new APIs at your own pace  
✅ **Two backends** - Old and new APIs running in parallel  

---

## 📍 Base URLs

| API Type | Base URL | Status |
|----------|----------|--------|
| **Old API** | `https://realestate123.pythonanywhere.com` | ✅ Active |
| **New API** | `https://trs-property-backend.onrender.com` | ✅ Active |

---

## 🔐 Authentication APIs

### Old API (Currently Used in Codebase)

```javascript
import { 
    useSendOtpMutation,      // Old: Send OTP
    useVerifyOtpMutation,    // Old: Verify OTP
    useSignUpMutation        // Old: Signup
} from '@/service/authApi';

// These continue to work exactly as before
```

### New API (Available for Future Use)

```javascript
import { 
    useSignupSendOtpMutation,      // New: Signup Send OTP
    useSignupVerifyOtpMutation,    // New: Signup Verify OTP
    useLoginSendOtpMutation,       // New: Login Send OTP
    useLoginVerifyOtpMutation,     // New: Login Verify OTP
    useGetCurrentUserQuery,        // New: Get current user
} from '@/service/authApi';
```

#### New API Response Format

```javascript
// Login/Signup response
{
    success: true,
    message: "Login successful",
    data: {
        user: {
            id: "...",
            fullName: "John Doe",
            phone: "9876543210",
            role: "customer",
            isVerified: true
        },
        token: "eyJhbGc..."
    }
}
```

---

## 🏠 Property APIs

### Old API (Currently Used in Codebase)

```javascript
import {
    useGetPropertyQuery,                   // Old: Get all properties
    useGetCustomerPropertyQuery,           // Old: Get user's properties
    useGetSinglePropertyQuery,             // Old: Get single property
    useAddAndEditBothPropertyMutation,     // Old: Create/Edit property
    useUploadPropertyImageMutation,        // Old: Upload images
    useUploadPropertyDocumentMutation,     // Old: Upload documents
    useDeletePropertyMutation,             // Old: Delete property
} from '@/service/propertyApi';

// These continue to work exactly as before
```

### New API (Available for Future Use)

```javascript
import {
    useGetAllPropertiesQuery,      // New: Get all properties (with filters)
    useGetPropertyByIdQuery,       // New: Get single property
    useCreatePropertyMutation,     // New: Create property (includes images/docs)
    useGetMyPropertiesQuery,       // New: Get my properties
} from '@/service/propertyApi';
```

#### Key Differences

| Feature | Old API | New API |
|---------|---------|---------|
| **Upload Flow** | Separate image/doc uploads | Combined with property creation |
| **Filters** | Limited | Advanced (price range, bedrooms, etc.) |
| **Pagination** | Basic | Full pagination support |
| **Response Format** | Custom | Standardized with `success`, `message`, `data` |

---

## 🔄 Migration Examples

### Example 1: Migrating Login Flow

#### Old Code (Still Works)
```javascript
const [verifyOtp] = useVerifyOtpMutation();

const result = await verifyOtp({ otp, phone, role });
// Handle old response format
```

#### New Code (Optional)
```javascript
const [loginVerifyOtp] = useLoginVerifyOtpMutation();
const dispatch = useDispatch();

const result = await loginVerifyOtp({ phone, otp }).unwrap();
dispatch(setToken(result.data.token));
dispatch(setUser(result.data.user));
```

### Example 2: Migrating Property Listing

#### Old Code (Still Works)
```javascript
const { data } = useGetPropertyQuery();
// data has old format
```

#### New Code (Optional)
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

### Example 3: Migrating Property Creation

#### Old Code (Still Works)
```javascript
const [addProperty] = useAddAndEditBothPropertyMutation();
const [uploadImage] = useUploadPropertyImageMutation();
const [uploadDoc] = useUploadPropertyDocumentMutation();

// 1. Create property
await addProperty(propertyData);

// 2. Upload images separately
await uploadImage({ imageForm });

// 3. Upload documents separately
await uploadDoc({ docForm });
```

#### New Code (Optional - Simpler!)
```javascript
const [createProperty] = useCreatePropertyMutation();

// Create FormData with everything
const formData = createPropertyFormData(
    propertyData,
    imageFiles,
    documentFiles
);

// Single API call!
await createProperty(formData);
```

---

## 📊 API Instance Architecture

```
Your Application
    │
    ├── realStateAPI (Old Base URL)
    │   ├── authApiOld
    │   ├── propertyApiOld
    │   ├── favoriteApi
    │   ├── profileApi
    │   ├── buyRequirementApi
    │   ├── notificationApi
    │   └── tourApi
    │
    └── newRealStateAPI (New Base URL)
        ├── authApiNew
        └── propertyApiNew
```

---

## 🎯 When to Use Which API?

### Use Old API When:
- ✅ Existing features that work perfectly
- ✅ Don't want to refactor working code
- ✅ Need features only available in old API (favorites, tours, etc.)

### Use New API When:
- ✅ Building new features
- ✅ Need advanced filtering/search
- ✅ Want simplified file upload flow
- ✅ Need standardized response format

---

## 🔧 Configuration Files

### Base URLs
**File:** `src/libs/based-url.js`
```javascript
export const basedUrl = "https://realestate123.pythonanywhere.com"      // Old
export const newBasedUrl = "https://trs-property-backend.onrender.com"  // New
```

### API Instances
**File:** `src/redux/createAPI.js`
```javascript
export const realStateAPI = createApi({ baseUrl: basedUrl })       // Old
export const newRealStateAPI = createApi({ baseUrl: newBasedUrl }) // New
```

### Redux Store
**File:** `src/redux/store.js`
```javascript
// Both API reducers and middlewares registered
[realStateAPI.reducerPath]: realStateAPI.reducer
[newRealStateAPI.reducerPath]: newRealStateAPI.reducer
```

---

## ⚠️ Important Considerations

### Token Management
Both APIs use the same token from Redux store:
```javascript
const token = getState().auth.token;
```

### Response Format Differences

**Old API Response:**
```javascript
// Varies by endpoint, no standard format
```

**New API Response:**
```javascript
{
    success: true/false,
    message: "...",
    data: { ... }
}
```

### Error Handling

Use the `getErrorMessage()` helper for consistent error extraction:
```javascript
import { getErrorMessage } from '@/utils/apiHelpers';

try {
    await someApiCall().unwrap();
} catch (error) {
    const message = getErrorMessage(error);
    toast.error(message);
}
```

---

## 📝 Migration Checklist

When migrating a component to new API:

- [ ] Identify which API hooks are being used
- [ ] Check if new API has equivalent endpoints
- [ ] Update imports to use new hooks
- [ ] Update response handling (new format is `data.data.*`)
- [ ] Update token storage (use Redux actions)
- [ ] Test thoroughly
- [ ] Update error handling

---

## 🐛 Troubleshooting

### Issue: Getting 404 on new API
**Solution:** Check if endpoint is available in new API. Not all old endpoints have new equivalents yet.

### Issue: Token not working with new API
**Solution:** Token format might be different. Check if you need to login again using new API.

### Issue: Response format is different
**Solution:** New API uses standardized format. Access data via `response.data.data.*`

### Issue: Build errors about missing exports
**Solution:** All exports are restored. Clear cache: `rm -rf .next && npm run dev`

---

## 📚 Documentation

- **[INTEGRATION_SUMMARY.md](INTEGRATION_SUMMARY.md)** - Complete integration summary
- **[API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md)** - Detailed API usage guide
- **[API_QUICK_REFERENCE.md](API_QUICK_REFERENCE.md)** - Quick reference card
- **[src/examples/apiUsageExamples.jsx](src/examples/apiUsageExamples.jsx)** - Working examples

---

## 🚀 Next Steps

1. **Continue using old APIs** - No action needed, everything works
2. **Try new APIs** - Experiment with new endpoints in new features
3. **Gradual migration** - Move to new APIs one component at a time
4. **Full migration** - Eventually deprecate old APIs (future)

---

**Last Updated:** February 15, 2026  
**Status:** ✅ Dual API Setup Complete - Zero Breaking Changes
