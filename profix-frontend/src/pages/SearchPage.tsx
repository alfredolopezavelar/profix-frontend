import { ChangeEvent, useState } from "react";
import { IProviderData, ISearchFilter } from "../types";
import { useLocation } from "wouter";
import { mockCategories, mockProviders } from "../dev-data/data";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ProviderCard } from "../components/ProviderCard";

const SearchPage = () => {
  const [location] = useLocation();

  const params = new URLSearchParams(location.split("?")[1] || "");
  const queryParam = params.get("query") || "";

  const [filter, setFilter] = useState<ISearchFilter>({
    query: queryParam,
    category: undefined,
    minRating: undefined,
    sortBy: undefined,
  });

  // states for pagination
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const providers = mockProviders;
  const categories = mockCategories;
  const isLoading = false;

  const handleSearchChange = (item: ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({ ...prev, query: item.target.value }));
  };

  const handleCategoryChange = (item: SelectChangeEvent<string>) => {
    const val = item.target.value;
    setFilter((prev) => ({
      ...prev,
      category: val !== "" ? val : undefined,
    }));
  };

  const handleRatingChange = (e: SelectChangeEvent<string>) => {
    const val = e.target.value;
    setFilter((prev) => ({
      ...prev,
      minRating: val ? Number(val) : undefined,
    }));
  };

  const handleSortChange = (sortBy: "price" | "rating") => {
    setFilter((prev) => ({ ...prev, sortBy }));
    setPage(1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        fontWeight="bold"
        color="primary"
        gutterBottom
      >
        Encuentra a tu proveedor
      </Typography>

      {/* Search & Filters */}
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 1,
          p: 3,
          mb: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-around",
            gap: 3,
          }}
        >
          <TextField
            sx={{ flex: 3 }}
            label="Search"
            variant="outlined"
            placeholder="Search for providers or services..."
            value={filter.query}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />

          <FormControl sx={{ flex: 1, width: { xs: "100%", md: "auto" } }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={filter.category !== undefined ? filter.category : ""}
              label="Category"
              onChange={handleCategoryChange}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ flex: 1, width: { xs: "100%", md: "auto" } }}>
            <InputLabel id="rating-select-label">Minimum Rating</InputLabel>
            <Select
              labelId="rating-select-label"
              id="rating-select"
              value={filter.minRating?.toString() || ""}
              label="Minimum Rating"
              onChange={handleRatingChange}
            >
              <MenuItem value="">Any Rating</MenuItem>
              <MenuItem value="5">5 Stars</MenuItem>
              <MenuItem value="4">4+ Stars</MenuItem>
              <MenuItem value="3">3+ Stars</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 3,
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant={filter.sortBy === "price" ? "contained" : "outlined"}
              color="inherit"
              size="small"
              onClick={() => handleSortChange("price")}
              sx={{
                bgcolor:
                  filter.sortBy === "price" ? "rgba(0, 0, 0, 0.05)" : undefined,
                borderColor: "rgba(0, 0, 0, 0.12)",
                color: "text.primary",
                fontFamily: "sans-serif",
                fontSize: "14px",
              }}
            >
              Precio: Menor a Mayor
            </Button>
            <Button
              variant={filter.sortBy === "rating" ? "contained" : "outlined"}
              color="inherit"
              size="small"
              onClick={() => handleSortChange("rating")}
              sx={{
                bgcolor:
                  filter.sortBy === "rating"
                    ? "rgba(0, 0, 0, 0.05)"
                    : undefined,
                borderColor: "rgba(0, 0, 0, 0.12)",
                color: "text.primary",
                fontFamily: "sans-serif",
                fontSize: "14px",
              }}
            >
              Mejor calificación
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Provider Results */}
      <Box sx={{ mb: 4 }}>
        {isLoading ? (
          <Typography>Loading providers...</Typography>
        ) : providers.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No providers found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search filters
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {providers.map((provider) => (
              <ProviderCard
                provider={provider.providerData as IProviderData}
                width="100%"
                providerId={provider.id}
                userName={provider.name}
              />
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default SearchPage;
