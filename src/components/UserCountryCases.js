import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Container } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  cardContents: {
    background: "linear-gradient(to right, #ece9e6, #ffffff)",
    textAlign: "center",
  },
  textColor: {
    color: "#581845",
  },
}));
const UserCountryCases = (props) => {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();
  const [countryData, setCountryData] = useState([]);
  const [countryIn, setCountryIn] = useState("");

  useEffect(() => {
    const fetchUserLocationData = async () => {
      let url = process.env.REACT_APP_PROD_API_URL;
      let countryUrl = process.env.REACT_APP_PROD_API_URL_USER_COUNTRY;
      let key = process.env.REACT_APP_SECRET_KEY;
      const responseFromUserLocationData = await axios(`${countryUrl}${key}`);
      setCountryIn(responseFromUserLocationData.data.country_name);

      if (countryIn.length > 2) {
        const responseFromCorona = await axios(`${url}countries`);
        const userLocationResult = responseFromCorona.data.map((data) => data);
        setCountryData(
          userLocationResult.filter((data) => data.country === countryIn)
        );
        if (countryIn.includes("United States")) {
          setCountryData(
            userLocationResult.filter((data) => data.country === "USA")
          );
        }
      }
    };
    fetchUserLocationData();
  }, [countryIn]);

  function colors(data) {
    // eslint-disable-next-line no-unused-vars
    let subjectColor = "";
    if (data <= 30) {
      return (subjectColor = "#58d68d");
    } else if (data > 30 && data < 80) {
      return (subjectColor = "#FFC300");
    } else if (data > 80 && data < 130) {
      return (subjectColor = "#FF5733");
    } else {
      return (subjectColor = "#C70039");
    }
  }
  return (
    <Grid item>
      <Card
        className={classes.cardContents}
        style={{ minWidth: "20em", minHeight: "20em" }}
      >
        <CardContent>
          <Typography
            className={classes.textColor}
            variant={matchesMD ? "h6" : "h3"}
          >
            Cases in {countryIn}
          </Typography>
          <hr />
          {!countryData || countryData.length === 0 ? (
            <Typography variant="h6">Loading...</Typography>
          ) : (
            countryData.map((data, i) => {
              return (
                <Container key={i}>
                  <Typography variant="h6">
                    <span style={{ color: "#581845" }}>Cases : </span>
                    <span
                      style={{ color: colors(data.cases), fontWeight: "bold" }}
                    >
                      {Number(data.cases).toLocaleString("en-IN")}
                    </span>
                  </Typography>
                  <Typography variant="h6">
                    <span style={{ color: "#581845" }}>Critical : </span>
                    <span
                      style={{
                        color: colors(data.critical),
                        fontWeight: "bold",
                      }}
                    >
                      {Number(data.critical).toLocaleString("en-IN")}
                    </span>
                  </Typography>
                  <Typography variant="h6">
                    <span style={{ color: "#581845" }}>Deaths : </span>
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      {Number(data.deaths).toLocaleString("en-IN")}
                    </span>
                  </Typography>
                  <Typography variant="h6">
                    <span style={{ color: "#581845" }}>Recovered : </span>
                    <span
                      style={{
                        color: "#58d68d",
                        fontWeight: "bold",
                      }}
                    >
                      {Number(data.recovered).toLocaleString("en-IN")}
                    </span>
                  </Typography>
                  <Typography variant="h6">
                    <span style={{ color: "#581845" }}>Today's Cases : </span>
                    <span
                      style={{
                        color: colors(data.todayCases),
                        fontWeight: "bold",
                      }}
                    >
                      {Number(data.todayCases).toLocaleString("en-IN")}
                    </span>
                  </Typography>
                  <Typography variant="h6">
                    <span style={{ color: "#581845" }}>Today's Deaths : </span>
                    <span
                      style={{
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      {Number(data.todayDeaths).toLocaleString("en-IN")}
                    </span>
                  </Typography>
                </Container>
              );
            })
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default UserCountryCases;
