/**
 * Example Components for API Integration
 * 
 * These examples demonstrate how to use the new API endpoints in React components
 */

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    useSignupSendOtpMutation,
    useSignupVerifyOtpMutation,
    useLoginSendOtpMutation,
    useLoginVerifyOtpMutation,
    useGetCurrentUserQuery,
} from '@/service/authApi';
import {
    useGetAllPropertiesQuery,
    useGetPropertyByIdQuery,
    useCreatePropertyMutation,
    useGetMyPropertiesQuery,
} from '@/service/propertyApi';
import { setToken, setUser } from '@/redux/authSlice';
import {
    isValidPhoneNumber,
    isValidOTP,
    getErrorMessage,
    createPropertyFormData,
    buildPropertySearchParams,
    validatePropertyData,
} from '@/utils/apiHelpers';

// ========================================
// EXAMPLE 1: Signup Component
// ========================================
export const SignupExample = () => {
    const [step, setStep] = useState(1); // 1: Enter details, 2: Verify OTP
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        role: 'customer',
        otp: '',
    });

    const [signupSendOtp, { isLoading: isSendingOtp }] = useSignupSendOtpMutation();
    const [signupVerifyOtp, { isLoading: isVerifying }] = useSignupVerifyOtpMutation();
    const dispatch = useDispatch();

    const handleSendOtp = async (e) => {
        e.preventDefault();

        // Validate phone number
        if (!isValidPhoneNumber(formData.phone)) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }

        try {
            const result = await signupSendOtp({
                fullName: formData.fullName,
                phone: formData.phone,
                role: formData.role,
            }).unwrap();

            console.log('OTP sent:', result.data.otp); // In dev: 000000
            setStep(2);
        } catch (error) {
            alert(getErrorMessage(error));
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        // Validate OTP
        if (!isValidOTP(formData.otp)) {
            alert('Please enter a valid 6-digit OTP');
            return;
        }

        try {
            const result = await signupVerifyOtp({
                fullName: formData.fullName,
                phone: formData.phone,
                otp: formData.otp,
                role: formData.role,
            }).unwrap();

            // Store token and user
            dispatch(setToken(result.data.token));
            dispatch(setUser(result.data.user));

            alert('Signup successful!');
            // Navigate to dashboard
        } catch (error) {
            alert(getErrorMessage(error));
        }
    };

    return (
        <div>
            {step === 1 ? (
                <form onSubmit={handleSendOtp}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Phone (10 digits)"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                    />
                    <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                        <option value="customer">Customer</option>
                        <option value="builder">Builder</option>
                        <option value="agent">Agent</option>
                    </select>
                    <button type="submit" disabled={isSendingOtp}>
                        {isSendingOtp ? 'Sending...' : 'Send OTP'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOtp}>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={formData.otp}
                        onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                        required
                    />
                    <button type="submit" disabled={isVerifying}>
                        {isVerifying ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>
            )}
        </div>
    );
};

// ========================================
// EXAMPLE 2: Login Component
// ========================================
export const LoginExample = () => {
    const [step, setStep] = useState(1); // 1: Enter phone, 2: Verify OTP
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');

    const [loginSendOtp, { isLoading: isSendingOtp }] = useLoginSendOtpMutation();
    const [loginVerifyOtp, { isLoading: isVerifying }] = useLoginVerifyOtpMutation();
    const dispatch = useDispatch();

    const handleSendOtp = async (e) => {
        e.preventDefault();

        if (!isValidPhoneNumber(phone)) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }

        try {
            const result = await loginSendOtp({ phone }).unwrap();
            console.log('OTP sent:', result.data.otp); // In dev: 000000
            setStep(2);
        } catch (error) {
            alert(getErrorMessage(error));
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        if (!isValidOTP(otp)) {
            alert('Please enter a valid 6-digit OTP');
            return;
        }

        try {
            const result = await loginVerifyOtp({ phone, otp }).unwrap();

            // Store token and user
            dispatch(setToken(result.data.token));
            dispatch(setUser(result.data.user));

            alert('Login successful!');
            // Navigate to dashboard
        } catch (error) {
            alert(getErrorMessage(error));
        }
    };

    return (
        <div>
            {step === 1 ? (
                <form onSubmit={handleSendOtp}>
                    <input
                        type="tel"
                        placeholder="Phone (10 digits)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={isSendingOtp}>
                        {isSendingOtp ? 'Sending...' : 'Send OTP'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOtp}>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={isVerifying}>
                        {isVerifying ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>
            )}
        </div>
    );
};

// ========================================
// EXAMPLE 3: Property List Component
// ========================================
export const PropertyListExample = () => {
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        city: '',
        propertyType: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        search: '',
    });

    const params = buildPropertySearchParams(filters);
    const { data, isLoading, error } = useGetAllPropertiesQuery(params);

    const handleFilterChange = (key, value) => {
        setFilters({ ...filters, [key]: value, page: 1 }); // Reset to page 1 on filter change
    };

    const handlePageChange = (newPage) => {
        setFilters({ ...filters, page: newPage });
    };

    if (isLoading) return <div>Loading properties...</div>;
    if (error) return <div>Error: {getErrorMessage(error)}</div>;

    return (
        <div>
            {/* Filters */}
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="City"
                    value={filters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                />
                <select
                    value={filters.propertyType}
                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                >
                    <option value="">All Types</option>
                    <option value="flat">Flat</option>
                    <option value="villa">Villa</option>
                    <option value="plot">Plot</option>
                </select>
                {/* Add more filters as needed */}
            </div>

            {/* Property List */}
            <div>
                {data?.data?.properties?.map((property) => (
                    <div key={property._id}>
                        <h3>{property.title}</h3>
                        <p>Price: ₹{property.price}</p>
                        <p>Location: {property.city}</p>
                        <p>Type: {property.propertyType}</p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {data?.data?.pagination && (
                <div>
                    <button
                        onClick={() => handlePageChange(filters.page - 1)}
                        disabled={filters.page === 1}
                    >
                        Previous
                    </button>
                    <span>
                        Page {data.data.pagination.currentPage} of{' '}
                        {data.data.pagination.totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(filters.page + 1)}
                        disabled={filters.page === data.data.pagination.totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

// ========================================
// EXAMPLE 4: Property Detail Component
// ========================================
export const PropertyDetailExample = ({ propertyId }) => {
    const { data, isLoading, error } = useGetPropertyByIdQuery(propertyId);

    if (isLoading) return <div>Loading property details...</div>;
    if (error) return <div>Error: {getErrorMessage(error)}</div>;

    const property = data?.data?.property;

    return (
        <div>
            <h1>{property.title}</h1>
            <p>Price: ₹{property.price}</p>
            <p>Location: {property.city}</p>
            <p>Type: {property.propertyType}</p>
            <p>Category: {property.category}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>Carpet Area: {property.carpetArea} sq.ft.</p>
            <p>Status: {property.possessionStatus}</p>

            {/* Images */}
            <div>
                {property.images?.map((img, index) => (
                    <img key={index} src={img} alt={`Property ${index + 1}`} />
                ))}
            </div>

            {/* Contact */}
            <div>
                <h3>Contact</h3>
                <p>Name: {property.createdBy?.fullName}</p>
                <p>Phone: {property.createdBy?.phone}</p>
            </div>
        </div>
    );
};

// ========================================
// EXAMPLE 5: Create Property Component
// ========================================
export const CreatePropertyExample = () => {
    const [propertyData, setPropertyData] = useState({
        title: '',
        propertyType: 'flat',
        category: 'residential',
        city: '',
        price: '',
        projectName: '',
        possessionStatus: 'ready-to-move',
        bookingAmount: '',
        isNegotiable: false,
        carpetArea: '',
        superArea: '',
        bedrooms: '',
        bathrooms: '',
        balconies: '',
        reraId: '',
        builderName: '',
        landmarks: '',
    });

    const [images, setImages] = useState(null);
    const [documents, setDocuments] = useState(null);

    const [createProperty, { isLoading }] = useCreatePropertyMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate property data
        const validation = validatePropertyData(propertyData);
        if (!validation.isValid) {
            alert(validation.errors.join('\n'));
            return;
        }

        try {
            const formData = createPropertyFormData(propertyData, images, documents);
            const result = await createProperty(formData).unwrap();

            alert('Property created successfully! Waiting for admin approval.');
            console.log('Created property:', result.data.property);
            // Navigate to my properties page
        } catch (error) {
            alert(getErrorMessage(error));
        }
    };

    const handleInputChange = (key, value) => {
        setPropertyData({ ...propertyData, [key]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Property Title"
                value={propertyData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
            />

            <select
                value={propertyData.propertyType}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
            >
                <option value="flat">Flat</option>
                <option value="villa">Villa</option>
                <option value="plot">Plot</option>
                <option value="office">Office</option>
                <option value="shop">Shop</option>
            </select>

            <select
                value={propertyData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
            >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
            </select>

            <input
                type="text"
                placeholder="City"
                value={propertyData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Price"
                value={propertyData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Bedrooms"
                value={propertyData.bedrooms}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
            />

            <input
                type="number"
                placeholder="Bathrooms"
                value={propertyData.bathrooms}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
            />

            <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages(e.target.files)}
            />
            <small>Upload up to 10 images</small>

            <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={(e) => setDocuments(e.target.files)}
            />
            <small>Upload up to 5 documents</small>

            <label>
                <input
                    type="checkbox"
                    checked={propertyData.isNegotiable}
                    onChange={(e) => handleInputChange('isNegotiable', e.target.checked)}
                />
                Price Negotiable
            </label>

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Property'}
            </button>
        </form>
    );
};

// ========================================
// EXAMPLE 6: My Properties Component
// ========================================
export const MyPropertiesExample = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useGetMyPropertiesQuery({ page, limit: 10 });

    if (isLoading) return <div>Loading your properties...</div>;
    if (error) return <div>Error: {getErrorMessage(error)}</div>;

    return (
        <div>
            <h2>My Properties</h2>
            <div>
                {data?.data?.properties?.map((property) => (
                    <div key={property._id}>
                        <h3>{property.title}</h3>
                        <p>Price: ₹{property.price}</p>
                        <p>Status: {property.postStatus}</p>
                        <p>Approved: {property.isApproved ? 'Yes' : 'No'}</p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {data?.data?.pagination && (
                <div>
                    <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                        Previous
                    </button>
                    <span>
                        Page {data.data.pagination.currentPage} of{' '}
                        {data.data.pagination.totalPages}
                    </span>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === data.data.pagination.totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

// ========================================
// EXAMPLE 7: Current User Component
// ========================================
export const CurrentUserExample = () => {
    const { data, isLoading, error } = useGetCurrentUserQuery();

    if (isLoading) return <div>Loading user info...</div>;
    if (error) return <div>Please login to view this page</div>;

    const user = data?.data?.user;

    return (
        <div>
            <h2>Profile</h2>
            <p>Name: {user.fullName}</p>
            <p>Phone: {user.phone}</p>
            <p>Role: {user.role}</p>
            <p>Verified: {user.isVerified ? 'Yes' : 'No'}</p>
            <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
    );
};
