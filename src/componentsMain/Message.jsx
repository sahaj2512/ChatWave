import { Box, Text, VStack } from "@chakra-ui/react";

// Message component for rendering individual chat messages
const Message = ({ 
  text = "", 
  user = "other", 
  timestamp, 
  senderEmail,
  senderNickname 
}) => {
  if (!text) return null; // Skip rendering if there's no message content

  // Format timestamp into human-readable form
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return "Just now"; // less than 1 minute
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`; // less than 1 hour
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`; // less than 1 day

    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = date.toDateString() === new Date(now - 86400000).toDateString();

    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (isYesterday) {
      return `Yesterday ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };

  // Get initials from sender's email
  const getSenderInitials = (email) => {
    if (!email) return "U";
    const name = email.split("@")[0];
    return name.charAt(0).toUpperCase();
  };

  const displayName = senderNickname || senderEmail; // Use nickname if available

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignSelf={user === "me" ? "flex-end" : "flex-start"}
      alignItems="flex-end"
      mb={2}
      w="full"
      justifyContent={user === "me" ? "flex-end" : "flex-start"}
    >
      {/* Avatar bubble for messages from other users */}
      {user === "other" && (
        <Box
          w="32px"
          h="32px"
          borderRadius="full"
          bg="yellow.300"
          mr={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <Text fontSize="xs" color="black" fontWeight="bold">
            {getSenderInitials(senderEmail)}
          </Text>
        </Box>
      )}

      {/* Message content section */}
      <VStack
        spacing={1}
        alignItems={user === "me" ? "flex-end" : "flex-start"}
        maxW="70%"
      >
        {/* Sender nickname (shown above the message) */}
        {user === "other" && (
          <Text fontSize="xs" fontWeight="bold" alignSelf="flex-start">
            {displayName}
          </Text>
        )}
        
        {/* Message bubble */}
        <Box
          bg={user === "me" ? "blue.300" : "yellow.200"}
          color={user === "me" ? "white" : "black"}
          px={4}
          py={2}
          borderRadius="lg"
          position="relative"
          _before={user === "me" ? {
            // Tail for message from 'me'
            content: '""',
            position: "absolute",
            bottom: "0",
            right: "-8px",
            width: "0",
            height: "0",
            borderLeft: "8px solid",
            borderLeftColor: "blue.300",
            borderTop: "8px solid transparent",
          } : {
            // Tail for message from others
            content: '""',
            position: "absolute",
            bottom: "0",
            left: "-8px",
            width: "0",
            height: "0",
            borderRight: "8px solid",
            borderRightColor: "gray.200",
            borderTop: "8px solid transparent",
          }}
        >
          <Text fontSize="sm" wordBreak="break-word">
            {text}
          </Text>
        </Box>
        
        {/* Timestamp below message bubble */}
        {timestamp && (
          <Text 
            fontSize="xs" 
            color="gray.500" 
            px={2}
            alignSelf={user === "me" ? "flex-end" : "flex-start"}
          >
            {formatTimestamp(timestamp)}
          </Text>
        )}
      </VStack>

      {/* Avatar bubble for 'me' (right side) */}
      {user === "me" && (
        <Box
          w="32px"
          h="32px"
          borderRadius="full"
          bg="blue.400"
          ml={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        > 
          <Text fontSize="xs" color="white" fontWeight="bold">
            {getSenderInitials(senderEmail)}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Message;
