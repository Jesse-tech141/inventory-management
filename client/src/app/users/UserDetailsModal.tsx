import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar, Box, Typography, IconButton } from "@mui/material";
import { User } from "@/types/types"; // Import the User interface
import CloseIcon from "@mui/icons-material/Close";

type UserDetailsModalProps = {
  user: User | null;
  onClose: () => void;
};

const UserDetailsModal = ({ user, onClose }: UserDetailsModalProps) => {
  if (!user) return null;

  return (
    <AnimatePresence>
      {user && (
        <Dialog
          open={!!user}
          onClose={onClose}
          maxWidth="sm" // Reduced maxWidth to make the modal smaller
          fullWidth
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5">User Details</Typography> {/* Smaller title */}
                <IconButton onClick={onClose} size="small"> {/* Smaller close button */}
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Box display="flex" flexDirection="column" gap={2}> {/* Reduced gap */}
                <Box display="flex" alignItems="center" gap={2} mb={2}> {/* Reduced gap and margin */}
                  <Avatar src={user.img} sx={{ width: 80, height: 80 }} /> {/* Smaller avatar */}
                  <Typography variant="h6">{user.username}</Typography> {/* Smaller username */}
                </Box>

                <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}> {/* Reduced gap */}
                  <Typography variant="body2"><strong>First Name:</strong> {user.firstname}</Typography>
                  <Typography variant="body2"><strong>Last Name:</strong> {user.lastname}</Typography>
                  <Typography variant="body2"><strong>Email:</strong> {user.email}</Typography>
                  <Typography variant="body2"><strong>Phone:</strong> {user.phoneNumber || 'N/A'}</Typography>
                  <Typography variant="body2"><strong>Address:</strong> {user.address || 'N/A'}</Typography>
                  <Typography variant="body2"><strong>Job:</strong> {user.jobDescription || 'N/A'}</Typography>
                  <Typography variant="body2"><strong>Gender:</strong> {user.sex || 'N/A'}</Typography>
                </Box>

                {user.bio && (
                  <Box mt={2}> {/* Reduced margin */}
                    <Typography variant="subtitle1" gutterBottom>Bio</Typography> {/* Smaller subtitle */}
                    <Typography variant="body2">{user.bio}</Typography> {/* Smaller bio text */}
                  </Box>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} variant="contained" color="primary" size="small"> {/* Smaller button */}
                Close
              </Button>
            </DialogActions>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default UserDetailsModal;