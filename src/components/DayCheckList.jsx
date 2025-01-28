import * as React from "react";
import { Stack, Typography, Button } from "@mui/material";
import { CiCircleQuestion } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // AG Grid Core Styles
import "ag-grid-community/styles/ag-theme-alpine.css"; // AG Grid Alpine Theme
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as echarts from "echarts";

export default function DayChecklist() {
  const [data, setData] = useState([]); // Dynamic data state

  const chartRef = useRef(null); // Create a reference for the chart
  const [chartData, setChartData] = useState({
    names: [],
    values: [],
  });

  // Define column definitions matching the data structure
  const [columnDefs] = useState([
    { field: "scenario", headerName: "Scenario", sortable: true, filter: true },
    { field: "name", headerName: "Name", sortable: true, filter: true },
    { field: "summary", headerName: "Summary", sortable: true, filter: true },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      filter: true,
      cellRendererFramework: (params) => {
        return params.value ? (
          <Button variant="contained" color="success">
            Success
          </Button>
        ) : (
          <Button variant="outlined" color="error">
            Error
          </Button>
        );
      },
    },
    { field: "id", headerName: "ID", sortable: true, filter: true },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filter: false,
      cellRendererFramework: (params) => {
        return (
          <a
            href={`https://yourlink.com/details/${params.data.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Details
          </a>
        );
      },
    },
  ]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://679474ccaad755a134e9896e.mockapi.io/screen/dailyck"
        );
        setData(res.data); // Update state with fetched data

        // Prepare data for the bar chart
        const names = res.data.map(item => item.name);
        const values = res.data.map(item => item.summary);
        setChartData({ names, values });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Initialize the ECharts bar chart
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      const option = {
        title: {
          text: "Summary of Items",
        },
        tooltip: {},
        xAxis: {
          type: "category",
          data: chartData.names, // Names of the items
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: chartData.values, // Summary data for the bars
            type: "bar",
          },
        ],
      };

      chartInstance.setOption(option);

      return () => {
        chartInstance.dispose(); // Clean up chart instance on component unmount
      };
    }
  }, [chartData]);

  return (
    <>
      {/* Buttons and Filters */}
      <Stack direction="row" spacing={3} sx={{ margin: 1.9 }}>
        <Button variant="outlined">
          Daily Checklist <CiCircleQuestion size={25} />
        </Button>
        <Button variant="outlined">
          Scenario <RiArrowDropDownLine size={25} />
        </Button>
        <Button variant="outlined">
          Status <RiArrowDropDownLine size={25} />
        </Button>
      </Stack>

      {/* Last Updated Info */}
      <div>
        <Typography variant="caption" sx={{ marginLeft: 2, marginTop: 0 }}>
          Updated on: 10:30 PM, 23 Apr 2025
        </Typography>
      </div>

      {/* AG Grid Table */}
      <div
        className="ag-theme-alpine"
        style={{
          height: 400,
          width: "100%",
          marginTop: "20px",
        }}
      >
        <AgGridReact
          rowData={data} // Use dynamic data fetched from API
          columnDefs={columnDefs}
          defaultColDef={{ filter: true, sortable: true }}
          pagination={true}
          paginationPageSize={5}
        />
      </div>

      {/* ECharts Bar Graph */}
      <div
        ref={chartRef}
        style={{
          height: 400,
          width: "100%",
          marginTop: "20px",
        }}
      ></div>
    </>
  );
}
