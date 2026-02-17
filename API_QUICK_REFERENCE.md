# Quick Reference Card - New API Integration

## 🔐 Authentication Hooks

```javascript
// Import hooks
import {
    useSignupSendOtpMutation,      // Signup: Send OTP
    useSignupVerifyOtpMutation,    // Signup: Verify OTP
    useLoginSendOtpMutation,       // Login: Send OTP
    useLoginVerifyOtpMutation,     // Login: Verify OTP
    useGetCurrentUserQuery,        // Get current user
} from '@/service/authApi';

// Import Redux actions
import { setToken, setUser } from '@/redux/authSlice';
```

## 🏠 Property Hooks

```javascript
// Import hooks
import {
    useGetAllPropertiesQuery,      // Get all properties (public)
    useGetPropertyByIdQuery,       // Get single property
    useCreatePropertyMutation,     // Create property (protected)
    useGetMyPropertiesQuery,       // Get my properties (protected)
} from '@/service/propertyApi';
```

## 🛠️ Helper Functions

```javascript
// Import helpers
import {
    createPropertyFormData,        // Build FormData for property
    buildPropertySearchParams,     // Build search params
    isValidPhoneNumber,            // Validate phone (10 digits)
    isValidOTP,                    // Validate OTP (6 digits)
    formatPrice,                   // Format: ₹10,00,000
    formatPriceShort,              // Format: ₹10 L
    getErrorMessage,               // Extract error message
    validatePropertyData,          // Validate property before submit
    
    // Constants
    PROPERTY_TYPES,
    PROPERTY_CATEGORIES,
    POSSESSION_STATUS,
    USER_ROLES,
} from '@/utils/apiHelpers';
```

---

## 📝 Common Patterns

### Pattern 1: Login Flow
```javascript
const [loginSendOtp] = useLoginSendOtpMutation();
const [loginVerifyOtp] = useLoginVerifyOtpMutation();
const dispatch = useDispatch();

// 1. Send OTP
await loginSendOtp({ phone: "9876543210" });

// 2. Verify OTP
const result = await loginVerifyOtp({ phone: "9876543210", otp: "000000" });
dispatch(setToken(result.data.token));
dispatch(setUser(result.data.user));
```

### Pattern 2: Get Properties with Filters
```javascript
const { data, isLoading } = useGetAllPropertiesQuery({
    page: 1,
    limit: 10,
    city: "Indore",
    propertyType: "flat",
    category: "residential",
    minPrice: 5000000,
    maxPrice: 10000000,
    bedrooms: 3,
    search: "luxury"
});

const properties = data?.data?.properties;
const pagination = data?.data?.pagination;
```

### Pattern 3: Create Property
```javascript
const [createProperty] = useCreatePropertyMutation();

// Build FormData
const formData = createPropertyFormData(
    {
        title: "Villa",
        propertyType: "villa",
        category: "residential",
        city: "Indore",
        price: 15000000,
        bedrooms: 4
    },
    imageFiles,
    documentFiles
);

// Submit
await createProperty(formData);
```

### Pattern 4: Handle Errors
```javascript
try {
    await someApiCall().unwrap();
} catch (error) {
    const message = getErrorMessage(error);
    alert(message);
}
```

---

## 📋 Response Structures

### Auth Response (Login/Signup)
```javascript
{
    success: true,
    message: "Login successful",
    data: {
        user: {
            id: "...",
            fullName: "...",
            phone: "...",
            role: "customer",
            isVerified: true
        },
        token: "eyJhbGc..."
    }
}
```

### Properties List Response
```javascript
{
    success: true,
    data: {
        properties: [{ _id, title, price, city, ... }],
        pagination: {
            currentPage: 1,
            totalPages: 35,
            totalItems: 348,
            itemsPerPage: 10
        }
    }
}
```

### Property Detail Response
```javascript
{
    success: true,
    data: {
        property: {
            _id: "...",
            title: "...",
            propertyType: "flat",
            category: "residential",
            city: "Indore",
            price: 7476000,
            bedrooms: 3,
            images: ["url1", "url2"],
            documents: ["url1"],
            createdBy: { fullName, phone }
        }
    }
}
```

### Error Response
```javascript
{
    success: false,
    message: "Error description",
    error: "Detailed error"
}
```

---

## 🎯 Valid Values

### Property Types
- `flat`, `villa`, `builder_floor`, `plot`, `office`, `shop`, `apartment`, `warehouse`, `other`

### Categories
- `residential`, `commercial`

### Possession Status
- `ready-to-move`, `under-construction`, `upcoming`

### User Roles
- `customer`, `builder`, `agent`

---

## 🔑 Environment

**Base URL:** `https://trs-property-backend.onrender.com`

**Dev OTP:** `000000`

**Token Storage:**
```javascript
// Get token
const token = useSelector(state => state.auth.token);

// Set token
dispatch(setToken(token));

// Clear token
dispatch(clearAuth());
```

---

## ⚡ Quick Checks

### ✅ Validate Phone
```javascript
isValidPhoneNumber("9876543210") // true
isValidPhoneNumber("123") // false
```

### ✅ Validate OTP
```javascript
isValidOTP("000000") // true
isValidOTP("123") // false
```

### ✅ Validate Property Data
```javascript
const { isValid, errors } = validatePropertyData({
    title: "Villa",
    propertyType: "villa",
    category: "residential",
    city: "Indore",
    price: 15000000
});
```

### ✅ Format Price
```javascript
formatPrice(7476000) // ₹74,76,000
formatPriceShort(7476000) // ₹74.76 L
formatPriceShort(150000000) // ₹15 Cr
```

---

## 🔍 Debugging

### Check if authenticated
```javascript
import { useSelector } from 'react-redux';

const token = useSelector(state => state.auth.token);
const user = useSelector(state => state.auth.user);

console.log("Token:", token);
console.log("User:", user);
```

### Check API call status
```javascript
const { data, isLoading, isError, error } = useGetAllPropertiesQuery();

console.log("Loading:", isLoading);
console.log("Error:", isError);
console.log("Error Message:", getErrorMessage(error));
console.log("Data:", data);
```

---

## 📚 Documentation Files

- **API_INTEGRATION_GUIDE.md** - Detailed integration guide
- **INTEGRATION_SUMMARY.md** - Complete summary of changes
- **src/examples/apiUsageExamples.jsx** - Working component examples
- **src/utils/apiHelpers.js** - Helper functions source code
- **API_QUICK_REFERENCE.md** - This document

---

**Last Updated:** February 15, 2026
