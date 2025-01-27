import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CiCircleQuestion } from "react-icons/ci";
import { Stack, Typography } from '@mui/material';
import { RiArrowDropDownLine } from "react-icons/ri";
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { RiExternalLinkLine } from "react-icons/ri";
import { FiBox } from "react-icons/fi";

export default function DayChecklist() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://679474ccaad755a134e9896e.mockapi.io/screen/dailyck');
        setData(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
     
      <TableContainer component={Paper} sx={{ marginTop: 0.5,boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.7)" }}>
      <Stack direction="row" spacing={3} sx={{ margin:1.9 }}>
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
      <div>
        <Typography variant="caption" sx={{ marginLeft:2,marginTop:0}} >Updated on: 10:30 PM, 23 Apr 2025</Typography>
      </div>
        <Table sx={{ minWidth: 650 , margin:1,boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.6)"}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>SCENARIO</TableCell>
              <TableCell align="right">NAME</TableCell>
              <TableCell align="right">SUMMARY</TableCell>
              <TableCell align="right">STATUS</TableCell>
              <TableCell align="right">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id} // Ensure `id` exists in the API data
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                <FiBox /> {row.scenario}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.summary}</TableCell>
                <TableCell align="right">
                  {row.status ? (
                    <Button variant="contained" color="success">
                      Success
                    </Button>
                  ) : (
                    <Button variant="outlined" color="error">
                      Error
                    </Button>
                  )}
                </TableCell>
                <TableCell align="right">
                  <a href="https://youtube.com" style={{ textDecoration: 'none', color: 'blue' }}>
                    <RiExternalLinkLine /> View Details
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
