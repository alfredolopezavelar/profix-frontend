import { Box, Container, Skeleton } from "@mui/material";

const SkeletonProfile = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 1,
        }}
      >
        {/* Header */}
        <Box sx={{ bgcolor: "rgba(0, 51, 102, 0.1)", p: 6 }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              alignItems: "center",
            }}
          >
            <Box sx={{ flex: { xs: "1 1 100%", md: "0 0 auto" } }}>
              <Skeleton variant="circular" width={80} height={80} />
            </Box>
            <Box sx={{ flex: "1 1 auto", minWidth: 200 }}>
              <Skeleton variant="text" width="40%" height={40} />
              <Skeleton variant="text" width="20%" height={24} />
              <Skeleton variant="text" width="30%" height={24} />
            </Box>
          </Box>
        </Box>

        {/* Body */}
        <Box sx={{ p: 6 }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
            }}
          >
            {/* Left column */}
            <Box sx={{ flex: { xs: "1 1 100%", md: "2 1 60%" } }}>
              <Skeleton variant="text" width="30%" height={32} />
              <Skeleton variant="rectangular" height={120} sx={{ my: 2 }} />

              <Skeleton variant="text" width="30%" height={32} sx={{ mt: 4 }} />
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  my: 2,
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Box
                    key={item}
                    sx={{ flex: { xs: "1 1 48%", md: "1 1 30%" } }}
                  >
                    <Skeleton variant="rectangular" height={140} />
                  </Box>
                ))}
              </Box>

              <Skeleton variant="text" width="30%" height={32} sx={{ mt: 4 }} />
              {[1, 2, 3].map((item) => (
                <Skeleton
                  key={item}
                  variant="rectangular"
                  height={100}
                  sx={{ my: 2 }}
                />
              ))}
            </Box>

            {/* Right column */}
            <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 35%" } }}>
              <Skeleton variant="rectangular" height={400} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SkeletonProfile;
