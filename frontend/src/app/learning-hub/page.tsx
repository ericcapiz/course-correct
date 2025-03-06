"use client";

import { useEffect } from "react";
import { Container, Typography, Box, Tab, Tabs } from "@mui/material";
import { useAuth } from "@/context/auth/authContext";
import { useRouter } from "next/navigation";
import StudyGroupForm from "@/components/learningHub/StudyGroupForms";
import StudyGroupCarousel from "@/components/profile/StudyGroupCarousel";
import { useStudyGroup } from "@/context/studyGroup/studyGroupContext";
import { useState } from "react";

const LearningHub = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { studyGroups, getAllStudyGroups, joinStudyGroup } = useStudyGroup();
  const [activeTab, setActiveTab] = useState(0);

  // Auth check and data fetching
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/");
      } else if (user.role !== "student") {
        router.push("/profile");
      } else {
        getAllStudyGroups();
      }
    }
  }, [user, authLoading, router, getAllStudyGroups]);

  // Filter available study groups
  const availableStudyGroups = studyGroups.filter(
    (group) =>
      !group.participants.some((participant) => participant._id === user?._id)
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (authLoading || !user) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }} role="main">
      <Typography
        variant="h4"
        sx={{
          fontFamily: "var(--font-heading)",
          color: "var(--primary-color)",
          fontWeight: 700,
          mb: 4,
          fontSize: { xs: "1.75rem", sm: "2.125rem" },
        }}
      >
        Learning Hub
      </Typography>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="learning hub sections"
        sx={{
          mb: 4,
          borderBottom: 1,
          borderColor: "divider",
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: { xs: "0.9rem", sm: "1.1rem" },
            fontWeight: 500,
            minWidth: { xs: "auto", sm: 160 },
            px: { xs: 2, sm: 3 },
          },
        }}
      >
        <Tab label="Create Study Group" />
        <Tab label="Available Study Groups" />
        <Tab label="Book Tutor Session" />
      </Tabs>

      <Box role="tabpanel" hidden={activeTab !== 0}>
        {activeTab === 0 && (
          <Box sx={{ maxWidth: "md", mx: "auto" }}>
            <StudyGroupForm />
          </Box>
        )}
      </Box>

      <Box role="tabpanel" hidden={activeTab !== 1}>
        {activeTab === 1 && (
          <StudyGroupCarousel
            user={user}
            availableStudyGroups={availableStudyGroups}
            joinStudyGroup={joinStudyGroup}
            getAllStudyGroups={getAllStudyGroups}
          />
        )}
      </Box>

      <Box role="tabpanel" hidden={activeTab !== 2}>
        {activeTab === 2 && (
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Tutor booking section coming soon...
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default LearningHub;
