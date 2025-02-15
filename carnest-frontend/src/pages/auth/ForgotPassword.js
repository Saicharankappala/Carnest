import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/system";
import { useSendPasswordResetEmailMutation } from "../../services/userAuthApi";

const ForgotPassword = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [serverError, setServerError] = useState({});
  const [serverMessage, setServerMessage] = useState("");
  const [forgotPassword, { isLoading }] = useSendPasswordResetEmailMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
    };

    const res = await forgotPassword(actualData);
    if (res.error) {
      setServerError(res.error.data.errors || {});
      setServerMessage("");
    } else if (res.data) {
      setServerError({});
      setServerMessage(res.data.msg); // Message from the backend
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: isMobile ? "#fff" : "#f0f2f5",
        padding: isMobile ? 0 : theme.spacing(2),
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 460,
          padding: theme.spacing(4),
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
          boxShadow: isMobile ? 'none' : "0px 4px 12px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
        component="form"
        noValidate
        id="forgot-password-form"
        onSubmit={handleSubmit}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#FF6436",
            fontWeight: "bold",
            marginBottom: theme.spacing(2),
          }}
        >
          Carnest
        </Typography>
        <Typography variant="h6" gutterBottom>
          Forgot Password?
        </Typography>
        <Typography variant="body2" gutterBottom>
          Enter your email, and we'll send you a link to reset your password.
        </Typography>
        <TextField
          fullWidth
          required
          id="email"
          name="email"
          label="Email Address"
          variant="outlined"
          margin="normal"
          error={Boolean(serverError.email)}
          helperText={serverError.email ? serverError.email[0] : ""}
        />
        <Box>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#FF6436",
                color: "white",
                marginTop: theme.spacing(2),
                marginBottom: theme.spacing(1),
                "&:hover": {
                  backgroundColor: "#36a420",
                },
              }}
            >
              Send Reset Link
            </Button>
          )}
        </Box>
        {serverMessage && (
          <Alert severity="success" sx={{ marginTop: theme.spacing(2) }}>
            {serverMessage}
          </Alert>
        )}
        {serverError.non_field_errors && (
          <Alert severity="error" sx={{ marginTop: theme.spacing(2) }}>
            {serverError.non_field_errors[0]}
          </Alert>
        )}
        <Divider sx={{ marginY: 2 }}>or</Divider>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#42b72a",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#36a420",
            },
          }}
          href="/login"
        >
          Back to Login
        </Button>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
