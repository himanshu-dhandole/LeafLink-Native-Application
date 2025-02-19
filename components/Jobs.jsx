import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const JobCard = ({ job, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.jobCard}>
    <View style={styles.jobHeader}>
      <Text style={styles.jobTitle}>{job.jobTitle}</Text>
    </View>
    <Text style={styles.jobDescription}>{job.description}</Text>
    <View style={styles.skillsContainer}>
      {job.skillsRequired && job.skillsRequired.length > 0 ? (
        job.skillsRequired.map((skill, index) => (
          <Text key={index} style={styles.skill}>
            {skill}
          </Text>
        ))
      ) : (
        <Text style={styles.noSkills}>No skills specified</Text>
      )}
    </View>
    <View style={styles.jobFooter}>
      <Text style={styles.company}>Posted by: {job.company || 'Unknown'}</Text>
      <Text style={styles.status}>
        {job.status || 'OPEN'}
      </Text>
    </View>
  </TouchableOpacity>
);

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dummyJobs = [
    {
        jobId: 1001,
        jobTitle: "Software Engineer",
        description: "Develop and maintain software applications for various platforms.",
        skillsRequired: ["Java", "Python", "C++", "Problem Solving"],
        company: "Tech Innovations Inc.",
        location: "San Francisco, CA",
        salaryRange: "$90,000 - $120,000",
        jobType: "Full-time",
        postedDate: "2025-02-01",
        status: "Open"
    },
    {
        jobId: 1002,
        jobTitle: "Data Analyst",
        description: "Analyze large datasets to extract actionable insights for decision making.",
        skillsRequired: ["SQL", "Excel", "Python", "Data Visualization"],
        company: "DataTech Solutions",
        location: "New York, NY",
        salaryRange: "$70,000 - $90,000",
        jobType: "Full-time",
        postedDate: "2025-01-15",
        status: "Closed"
    },
    {
        jobId: 1003,
        jobTitle: "Machine Learning Engineer",
        description: "Design and implement machine learning models for predictive analytics.",
        skillsRequired: ["Python", "TensorFlow", "Scikit-learn", "Deep Learning"],
        company: "AI Labs Inc.",
        location: "Seattle, WA",
        salaryRange: "$110,000 - $140,000",
        jobType: "Full-time",
        postedDate: "2025-01-28",
        status: "Open"
    },
    {
        jobId: 1004,
        jobTitle: "Cybersecurity Analyst",
        description: "Monitor and protect IT systems from security threats and vulnerabilities.",
        skillsRequired: ["Cybersecurity", "Network Security", "SIEM", "Incident Response"],
        company: "SecureNet Solutions",
        location: "Austin, TX",
        salaryRange: "$80,000 - $100,000",
        jobType: "Full-time",
        postedDate: "2025-02-05",
        status: "Open"
    },
    {
        jobId: 1005,
        jobTitle: "Frontend Developer",
        description: "Develop user-friendly web applications with modern frontend technologies.",
        skillsRequired: ["React", "JavaScript", "CSS", "HTML"],
        company: "WebTech Innovations",
        location: "Remote",
        salaryRange: "$75,000 - $95,000",
        jobType: "Remote",
        postedDate: "2025-01-30",
        status: "Open"
    },
    {
        jobId: 1006,
        jobTitle: "Backend Developer",
        description: "Build and maintain scalable backend services for web applications.",
        skillsRequired: ["Node.js", "Express", "MongoDB", "REST API"],
        company: "CloudSoft Solutions",
        location: "Boston, MA",
        salaryRange: "$85,000 - $110,000",
        jobType: "Full-time",
        postedDate: "2025-02-02",
        status: "Open"
    },
    {
        jobId: 1007,
        jobTitle: "Cloud Engineer",
        description: "Design and maintain cloud infrastructure using AWS and Azure.",
        skillsRequired: ["AWS", "Azure", "Kubernetes", "Terraform"],
        company: "Cloud Architects LLC",
        location: "Chicago, IL",
        salaryRange: "$95,000 - $130,000",
        jobType: "Full-time",
        postedDate: "2025-02-10",
        status: "Open"
    },
    {
        jobId: 1008,
        jobTitle: "UI/UX Designer",
        description: "Create intuitive and visually appealing user interfaces.",
        skillsRequired: ["Figma", "Adobe XD", "User Research", "Wireframing"],
        company: "DesignCraft Studios",
        location: "Los Angeles, CA",
        salaryRange: "$70,000 - $90,000",
        jobType: "Full-time",
        postedDate: "2025-01-22",
        status: "Closed"
    }
];


  useEffect(() => {
    const fetchJobs = async () => {
      setJobs(dummyJobs);
      setLoading(false);
    };
    fetchJobs();
  }, [searchQuery]);

  const handleJobClick = (job) => {
    // Handle job click, e.g., navigate to job details
  };

  const filteredJobs = searchQuery
    ? jobs.filter((job) =>
        job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : jobs;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Job Board</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search jobs..."
        placeholderTextColor="#9ca3af"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView style={styles.jobList}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : filteredJobs.length === 0 ? (
          <Text style={styles.noJobsText}>No jobs found</Text>
        ) : (
          filteredJobs.map((job) => (
            <JobCard key={job.jobId} job={job} onPress={() => handleJobClick(job)} />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Jobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#333',
    color: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  jobList: {
    flex: 1,
  },
  jobCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  jobDescription: {
    color: '#9ca3af',
    marginVertical: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  noSkills: {
    color: '#777',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  company: {
    color: '#aaa',
  },
  status: {
    color: '#0f0',
  },
  loadingText: {
    color: '#777',
    textAlign: 'center',
  },
  errorText: {
    color: '#f00',
    textAlign: 'center',
  },
  noJobsText: {
    color: '#777',
    textAlign: 'center',
  },
});