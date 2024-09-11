import { Grid2, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MealCard } from "../Meal-Card";
import { getMeals } from "../../http";

const loadingPlaceholders = new Array(6).fill(null).map((_, i) => (
  <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} key={i}>
    <Skeleton variant="rectangular" height={345} width="100%" sx={{borderRadius: "15px"}} />
  </Grid2>
));

export const Main = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //  fetch meals from backend on mount
  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);
      const data = await getMeals();
      setIsLoading(false);
      setMeals(data);
    }
    fetchMeals();
  }, []);

  return (
    <div id="meals">
      <Grid2 container justifyContent={"center"} spacing={{ xs: 2, md: 3 }}>
        {isLoading ? (
          loadingPlaceholders
        ) : meals && meals.length > 0 ? (
          meals.map((meal, index) => {
            return (
              <Grid2 key={meal.id || index} size={{ xs: 12, sm: 6, md: 4 }}>
                <MealCard key={meal.id} {...meal} />
              </Grid2>
            );
          })
        ) : (
          <h1>Opps, no data to show at the moment :/ .</h1>
        )}
      </Grid2>
    </div>
  );
};
