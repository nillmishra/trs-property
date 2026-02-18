# API Integration Guide

This document explains how to use the new API endpoints integrated into the application.

## 🔄 Changes Made

### Base URL Updated
- **Old URL:** `https://realestate123.pythonanywhere.com`
- **New URL:** `https://trs-property-backend.onrender.com`

### Files Modified
1. `src/libs/based-url.js` - Updated base URL
2. `src/service/authApi.js` - New authentication endpoints
3. `src/service/propertyApi.js` - New property endpoints
4. `src/redux/createAPI.js` - Updated tag types

---

## 🔐 Authentication APIs

### 1. Signup Flow

#### Step 1: Send OTP for Signup
```javascript
import { useSignupSendOtpMutation } from '@/service/authApi';

const [signupSendOtp, { isLoading }] = useSignupSendOtpMutation();

const handleSignupSendOtp = async () => {
    try {
        const result = await signupSendOtp({
            fullName: "John Doe",
            phone: "9876543210",
            role: "customer" // or "builder" or "agent"
        }).unwrap();
        
        console.log("OTP sent:", result.data.otp); // In dev: 000000
        // Show OTP verification form
    } catch (error) {
        console.error("Error:", error);
    }
};
```

#### Step 2: Verify OTP and Complete Signup
```javascript
import { useSignupVerifyOtpMutation } from '@/service/authApi';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '@/redux/authSlice';

const [signupVerifyOtp, { isLoading }] = useSignupVerifyOtpMutation();
const dispatch = useDispatch();

const handleSignupVerifyOtp = async (otp) => {
    try {
        const result = await signupVerifyOtp({
            fullName: "John Doe",
            phone: "9876543210",
            otp: otp,
            role: "customer"
        }).unwrap();
        
        // Store token and user in Redux
        dispatch(setToken(result.data.token));
        dispatch(setUser(result.data.user));
        
        // Navigate to dashboard or home
    } catch (error) {
        console.error("Error:", error);
    }
};
```

### 2. Login Flow

#### Step 1: Send OTP for Login
```javascript
import { useLoginSendOtpMutation } from '@/service/authApi';

const [loginSendOtp, { isLoading }] = useLoginSendOtpMutation();

const handleLoginSendOtp = async () => {
    try {
        const result = await loginSendOtp({
            phone: "9876543210"
        }).unwrap();
        
        console.log("OTP sent:", result.data.otp); // In dev: 000000
        // Show OTP verification form
    } catch (error) {
        console.error("Error:", error);
    }
};
```

#### Step 2: Verify OTP and Login
```javascript
import { useLoginVerifyOtpMutation } from '@/service/authApi';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '@/redux/authSlice';

const [loginVerifyOtp, { isLoading }] = useLoginVerifyOtpMutation();
const dispatch = useDispatch();

const handleLoginVerifyOtp = async (otp) => {
    try {
        const result = await loginVerifyOtp({
            phone: "9876543210",
            otp: otp
        }).unwrap();
        
        // Store token and user in Redux
        dispatch(setToken(result.data.token));
        dispatch(setUser(result.data.user));
        
        // Navigate to dashboard or home
    } catch (error) {
        console.error("Error:", error);
    }
};
```

### 3. Get Current User
```javascript
import { useGetCurrentUserQuery } from '@/service/authApi';

const { data, isLoading, error } = useGetCurrentUserQuery();

// Access user data
if (data) {
    console.log(data.data.user);
}
```

---

## 🏠 Property APIs

### 1. Get All Properties (Public)
```javascript
import { useGetAllPropertiesQuery } from '@/service/propertyApi';

const { data, isLoading, error } = useGetAllPropertiesQuery({
    page: 1,
    limit: 10,
    city: "Indore",
    propertyType: "flat",
    category: "residential",
    minPrice: 5000000,
    maxPrice: 10000000,
    bedrooms: 3,
    search: "Luxury"
});

// Access properties
if (data) {
    console.log(data.data.properties);
    console.log(data.data.pagination);
}
```

### 2. Get Property by ID (Public)
```javascript
import { useGetPropertyByIdQuery } from '@/service/propertyApi';

const propertyId = "69917f5ca2540f9714357bc5";
const { data, isLoading, error } = useGetPropertyByIdQuery(propertyId);

// Access property details
if (data) {
    console.log(data.data.property);
}
```

### 3. Create Property (Protected - Requires Auth)
```javascript
import { useCreatePropertyMutation } from '@/service/propertyApi';

const [createProperty, { isLoading }] = useCreatePropertyMutation();

const handleCreateProperty = async () => {
    try {
        // Create FormData for file uploads
        const formData = new FormData();
        
        // Required fields
        formData.append('title', 'Luxury Villa in Vijay Nagar');
        formData.append('propertyType', 'villa'); // flat, villa, plot, office, shop, etc.
        formData.append('category', 'residential'); // residential or commercial
        formData.append('city', 'Indore');
        formData.append('price', 15000000);
        
        // Optional fields
        formData.append('projectName', 'Green Valley');
        formData.append('possessionStatus', 'ready-to-move'); // ready-to-move, under-construction, upcoming
        formData.append('bookingAmount', 1000000);
        formData.append('isNegotiable', true);
        formData.append('carpetArea', 2500);
        formData.append('superArea', 3000);
        formData.append('bedrooms', 4);
        formData.append('bathrooms', 3);
        formData.append('balconies', 3);
        formData.append('reraId', 'MP/RERA/2024/67890');
        formData.append('builderName', 'XYZ Builders');
        formData.append('landmarks', 'Near Treasure Island Mall');
        
        // Add images (Max 10)
        const imageFiles = document.getElementById('images').files;
        for (let i = 0; i < imageFiles.length; i++) {
            formData.append('images', imageFiles[i]);
        }
        
        // Add documents (Max 5)
        const docFiles = document.getElementById('documents').files;
        for (let i = 0; i < docFiles.length; i++) {
            formData.append('documents', docFiles[i]);
        }
        
        const result = await createProperty(formData).unwrap();
        
        console.log("Property created:", result.data.property);
        console.log("Upload info:", result.data.uploadInfo);
        
        // Navigate to my properties page
    } catch (error) {
        console.error("Error:", error);
    }
};
```

### 4. Get My Properties (Protected - Requires Auth)
```javascript
import { useGetMyPropertiesQuery } from '@/service/propertyApi';

const { data, isLoading, error } = useGetMyPropertiesQuery({
    page: 1,
    limit: 10
});

// Access user's properties
if (data) {
    console.log(data.data.properties);
    console.log(data.data.pagination);
}
```

---

## 🔄 Backward Compatibility

The following exports are available for backward compatibility with existing code:

### Authentication
```javascript
// Old names (still work)
import { useSendOtpMutation, useVerifyOtpMutation } from '@/service/authApi';

// New names (recommended)
import { useLoginSendOtpMutation, useLoginVerifyOtpMutation } from '@/service/authApi';
```

### Properties
```javascript
// Old names (still work)
import { 
    useGetPropertyQuery,
    useGetCustomerPropertyQuery,
    useGetSinglePropertyQuery 
} from '@/service/propertyApi';

// New names (recommended)
import { 
    useGetAllPropertiesQuery,
    useGetMyPropertiesQuery,
    useGetPropertyByIdQuery 
} from '@/service/propertyApi';
```

---

## 📝 Property Types

Valid property types:
- `flat`
- `villa`
- `builder_floor`
- `plot`
- `office`
- `shop`
- `apartment`
- `warehouse`
- `other`

## 🏷️ Categories

Valid categories:
- `residential`
- `commercial`

## 👥 User Roles

- `customer` - Regular users who can list and search properties
- `builder` - Builders who can list properties
- `agent` - Real estate agents who can list properties

---

## ⚠️ Important Notes

1. **OTP in Development**: In development mode, OTP is fixed as `000000` for testing
2. **File Uploads**: Images and documents are uploaded to Cloudinary
3. **Authentication**: Include JWT token in headers for protected routes (automatically handled by RTK Query)
4. **Property Status**: New properties are created with `pending` status and require admin approval
5. **Response Structure**: All API responses follow this format:
   ```json
   {
     "success": true/false,
     "message": "...",
     "data": { ... }
   }
   ```

---

## 🔧 Troubleshooting

### Token Not Being Sent
Check that token is stored in Redux state:
```javascript
import { useSelector } from 'react-redux';
const token = useSelector((state) => state.auth.token);
console.log("Token:", token);
```

### CORS Issues
Ensure the backend allows requests from your frontend domain.

### File Upload Issues
- Ensure Content-Type is `multipart/form-data`
- Check file size limits (images and documents)
- Verify file types are supported

---

## 📚 Additional Resources

- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- Backend API Documentation (see project root)
