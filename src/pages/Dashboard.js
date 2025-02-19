import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import Navbar from "../components/Navbar";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [expenseData, setExpenseData] = useState({
    totalExpenses: 0,
    pendingApprovals: 0,
    categories: [],
    categoryAmounts: [],
    monthlyExpenses: [],
  });

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      const data = {
        totalExpenses: 5000,
        pendingApprovals: 1200,
        categories: ["Travel", "Food", "Supplies"],
        categoryAmounts: [1500, 1200, 2300],
        monthlyExpenses: [500, 800, 1200, 1500, 2000],
      };
      setExpenseData(data);
    };

    fetchData();
  }, []);

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Monthly Expenses",
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        data: expenseData.monthlyExpenses,
      },
    ],
  };

  const pieChartData = {
    labels: expenseData.categories,
    datasets: [
      {
        label: "Expenses by Category",
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        data: expenseData.categoryAmounts,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Dashboard</Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Expenses</Typography>
                <Typography variant="h4">${expenseData.totalExpenses}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pending Approvals</Typography>
                <Typography variant="h4">${expenseData.pendingApprovals}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6">Monthly Expenses</Typography>
                <Bar data={barChartData} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Expenses by Category</Typography>
                <Pie data={pieChartData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
