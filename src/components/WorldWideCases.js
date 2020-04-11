import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Moment from "react-moment";
import { Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  cardContents: {
    background: "linear-gradient(to right, #ece9e6, #ffffff)",
    textAlign: "center",
  },
  textColor: {
    color: " #581845 ",
  },
}));

const WorldWideCases = (props) => {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();

  const [globalData, setGlobalData] = useState({});
  useEffect(() => {
    let url = process.env.REACT_APP_PROD_API_URL;
    axios
      .get(`${url}all`, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((res) => {
        if (res.status === 200) {
          setGlobalData(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid item>
      <Card
        className={classes.cardContents}
        style={{ minWidth: "20em", minHeight: "20em" }}
      >
        <CardContent>
          <Typography
            className={classes.textColor}
            variant={matchesMD ? "h5" : "h3"}
          >
            Cases WorldWide
          </Typography>
          <hr />
          {globalData.length === 0 ? (
            <Typography variant="h6">Loading...</Typography>
          ) : (
            <Container>
              <Typography variant="h6" className={classes.textColor}>
                Last Updated:{" "}
                <Moment style={{ color: "#000" }} date={globalData.updated} />
              </Typography>
              <hr />
              <Typography variant="h6" className={classes.textColor}>
                Total Cases:{" "}
                <span style={{ color: "#C70039" }}>
                  {Number(globalData.cases).toLocaleString("en-IN")}
                </span>
              </Typography>
              <Typography variant="h6" className={classes.textColor}>
                Today's Cases:{" "}
                <span style={{ color: "#C70039" }}>
                  {Number(globalData.todayCases).toLocaleString("en-IN")}
                </span>
              </Typography>
              <Typography variant="h6" className={classes.textColor}>
                Deaths:{" "}
                <span style={{ color: "#C70039" }}>
                  {Number(globalData.deaths).toLocaleString("en-IN")}
                </span>
              </Typography>
              <Typography variant="h6" className={classes.textColor}>
                Today's Deaths:{" "}
                <span style={{ color: "#C70039" }}>
                  {Number(globalData.todayDeaths).toLocaleString("en-IN")}
                </span>
              </Typography>
              <Typography variant="h6" className={classes.textColor}>
                Recovered:{" "}
                <span style={{ color: "#C70039" }}>
                  {Number(globalData.recovered).toLocaleString("en-IN")}
                </span>
              </Typography>
              <Typography variant="h6" className={classes.textColor}>
                Total Active:{" "}
                <span style={{ color: "#C70039" }}>
                  {Number(globalData.active).toLocaleString("en-IN")}
                </span>
              </Typography>
              <Typography variant="h6" className={classes.textColor}>
                Total Critical:{" "}
                <span style={{ color: "#C70039" }}>
                  {" "}
                  {Number(globalData.critical).toLocaleString("en-IN")}
                </span>
              </Typography>
              <Typography variant="h6" className={classes.textColor}>
                Total Tests Performed:{" "}
                <span style={{ color: "#C70039" }}>
                  {" "}
                  {Number(globalData.tests).toLocaleString("en-IN")}
                </span>
              </Typography>
              <Typography variant="h6" className={classes.textColor}>
                Total Affected Countried:{" "}
                <span style={{ color: "#C70039" }}>
                  {Number(globalData.affectedCountries).toLocaleString("en-IN")}
                </span>
              </Typography>
            </Container>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default WorldWideCases;
