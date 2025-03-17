import { useGetDashboardMetricsQuery } from "@/state/api";
import React from "react";
import Rating from "@mui/material/Rating"; // Import Material-UI Rating
import Stack from "@mui/material/Stack"; // Import Stack for spacing
import { Star } from "lucide-react";

const CardTrendingProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  // Sort products by rating (highest to lowest)
  const sortedProducts = dashboardMetrics?.trendingProducts
    ? [...dashboardMetrics.trendingProducts].sort((a, b) => (b.ratings || 0) - (a.ratings || 0))
    : [];

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Trending Products
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600 border-b">
                  <th className="px-5 py-3">Product Name</th>
                  <th className="px-5 py-3">Product ID</th>
                  <th className="px-5 py-3">Brand</th>
                  <th className="px-5 py-3">Stock Quantity</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3">Ratings</th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.map((product) => (
                  <tr
                    key={product.productId}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-5 py-4 text-sm font-medium text-gray-700">
                      {product.name}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-700">
                      #{product.productId}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-700">
                      {product.brand}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-700">
                      {product.stockQuantity}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-700">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">
                      <Stack spacing={1}>
                        <Rating
                          name="half-rating-read"
                          value={product.ratings || 0} // Use `ratings` from the product
                          precision={0.5} // Allow half-star precision
                          readOnly // Make it read-only
                          emptyIcon={
                            <Star style={{ opacity: 0.55 }} fontSize="inherit" />
                          }
                        />
                      </Stack>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default CardTrendingProducts;