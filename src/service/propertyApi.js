import { realStateAPI, newRealStateAPI } from "@/redux/createAPI";

/* ==========================================
   OLD API ENDPOINTS (ACTIVE - Using Old Base URL)
   ========================================== */

const propertyApiOld = realStateAPI.injectEndpoints({
    endpoints: (build) => ({
        getProperty: build.query({
            query: () => `property/view/`,
            providesTags: ['getProperty', 'getCustomerProperty']
        }),
        getCustomerProperty: build.query({
            query: () => `property/customer_view/`,
            providesTags: ['getProperty', 'getCustomerProperty']
        }),
        getSingleProperty: build.query({
            query: (id) => `property/property_detail/?property_id=${id}`
        }),
        addAndEditBothProperty: build.mutation({
            query: (formValues) => {
                const payload = {
                    title: formValues?.title,
                    property_type: formValues?.property_type,
                    city: formValues?.city,
                    project_name: formValues?.project_name,
                    possession_status: formValues?.possession_status,
                    property_post_status: formValues?.property_post_status,
                    expected_price: formValues?.expected_price,
                    booking_amount: formValues?.booking_amount,
                    carpet_area: formValues?.carpet_area,
                    super_area: formValues?.super_area,
                    bedrooms: formValues?.bedrooms,
                    bathrooms: formValues?.bathrooms,
                    balconies: formValues?.balconies,
                    rera_id: formValues?.rera_id,
                    builder_name: formValues?.builder_name,
                    nearby_landmarks: formValues?.nearby_landmarks,
                    id: formValues?.id
                };
                return {
                    url: formValues?.id ? `property/customer_update/` : `property/store/`,
                    method: formValues?.id ? "PATCH" : "POST",
                    body: payload,
                }
            },
            invalidatesTags: ['getProperty', 'getCustomerProperty']
        }),
        uploadPropertyImage: build.mutation({
            query: ({ imageForm }) => {
                return {
                    url: `property/property_image_store/`,
                    method: "POST",
                    body: imageForm,
                    formData: true,
                }
            },
        }),
        uploadPropertyDocument: build.mutation({
            query: ({ docForm }) => {
                return {
                    url: `property/property_document_store/`,
                    method: "POST",
                    body: docForm,
                    formData: true,
                }
            },
            invalidatesTags: ['getProperty', 'getCustomerProperty']
        }),
        deleteProperty: build.mutation({
            query: (id) => ({
                url: `property/customer_delete/${id}`,
                method: "DELETE", 
            }),
            invalidatesTags: ['getCustomerProperty']
        }),
    }),
});

/* ==========================================
   NEW API ENDPOINTS (Using New Base URL)
   ========================================== */

const propertyApiNew = newRealStateAPI.injectEndpoints({
    endpoints: (build) => ({
        // 1. Get All Properties (Public)
        // GET /api/properties?page=1&limit=10&city=Indore&propertyType=flat&category=residential&minPrice=5000000&maxPrice=10000000&bedrooms=3&search=
        getAllProperties: build.query({
            query: (params = {}) => {
                const queryParams = new URLSearchParams();
                
                if (params.page) queryParams.append('page', params.page);
                if (params.limit) queryParams.append('limit', params.limit);
                if (params.city) queryParams.append('city', params.city);
                if (params.propertyType) queryParams.append('propertyType', params.propertyType);
                if (params.category) queryParams.append('category', params.category);
                if (params.minPrice) queryParams.append('minPrice', params.minPrice);
                if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice);
                if (params.bedrooms) queryParams.append('bedrooms', params.bedrooms);
                if (params.search) queryParams.append('search', params.search);
                
                return `/api/properties${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
            },
            providesTags: ['properties'],
        }),

        // 2. Get Property by ID (Public)
        // GET /api/properties/:id
        getPropertyById: build.query({
            query: (id) => `/api/properties/${id}`,
            providesTags: (result, error, id) => [{ type: 'properties', id }],
        }),

        // 3. Create Property (Protected)
        // POST /api/properties
        // Content-Type: multipart/form-data
        createProperty: build.mutation({
            query: (formData) => ({
                url: `/api/properties`,
                method: "POST",
                body: formData,
                formData: true, // Important for file uploads
            }),
            invalidatesTags: ['properties', 'myProperties'],
        }),

        // 4. Get My Properties (Protected)
        // GET /api/properties/user/my-properties?page=1&limit=10
        getMyProperties: build.query({
            query: (params = {}) => {
                const queryParams = new URLSearchParams();
                
                if (params.page) queryParams.append('page', params.page);
                if (params.limit) queryParams.append('limit', params.limit);
                
                return `/api/properties/user/my-properties${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
            },
            providesTags: ['myProperties'],
        }),
    }),
});

// Export OLD hooks (existing code continues to work)
export const {
    useGetPropertyQuery,
    useGetCustomerPropertyQuery,
    useGetSinglePropertyQuery,
    useAddAndEditBothPropertyMutation,
    useUploadPropertyDocumentMutation,
    useUploadPropertyImageMutation,
    useDeletePropertyMutation,
} = propertyApiOld;

// Export NEW hooks (for new API integration)
export const {
    useGetAllPropertiesQuery,
    useGetPropertyByIdQuery,
    useCreatePropertyMutation,
    useGetMyPropertiesQuery,
} = propertyApiNew;

