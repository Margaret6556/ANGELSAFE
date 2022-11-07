import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { Divider, makeStyles, Text } from "@rneui/themed";
import { useGetGroupChartQuery } from "@/shared/api/stats";
import { Loading } from "@/shared/components";
import { PieChart } from "react-native-chart-kit";
import { Moods } from "@/shared/state/reducers/experience";

interface StatChartProps {
  groupId: string;
}

const StatChart = ({ groupId }: StatChartProps) => {
  const styles = useStyles();
  const [legends, setLegends] = useState<any[]>([]);
  const { data, isLoading } = useGetGroupChartQuery({
    groupId,
  });

  useEffect(() => {
    if (data?.data) {
      const legend = [
        {
          name: Moods.HAPPY,
          color: MoodColors.HAPPY,
          data: 40,
        },
        {
          name: Moods.CALM,
          color: MoodColors.CALM,
          data: 30,
        },
        {
          name: Moods.SAD,
          color: MoodColors.SAD,
          data: 10,
        },
        {
          name: Moods.SICK,
          color: MoodColors.SICK,
          data: 5,
        },
        {
          name: Moods.ANGRY,
          color: MoodColors.ANGRY,
          data: 15,
        },
      ];

      setLegends(legend);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (data) {
    const moods = data.data;

    if (
      !!!moods[1] &&
      !!!moods[2] &&
      !!!moods[3] &&
      !!!moods[4] &&
      !!!moods[5]
    ) {
      return (
        <View style={{ marginVertical: 12 }}>
          <Text>Come back later, data not yet available.</Text>
        </View>
      );
    }

    const keys = Object.keys(moods);

    const mapped = keys.map((i) => {
      const obj = {
        name: "",
        color: "red",
        data: 100,
      };

      switch (i) {
        case "1": {
          obj.name = Moods.HAPPY;
          obj.color = MoodColors.HAPPY;
          obj.data = 40;
          break;
        }
        case "2": {
          obj.name = Moods.CALM;
          obj.color = MoodColors.CALM;
          obj.data = 30;
          break;
        }
        case "3": {
          obj.name = Moods.SAD;
          obj.color = MoodColors.SAD;
          obj.data = 10;
          break;
        }
        case "4": {
          obj.name = Moods.SICK;
          obj.color = MoodColors.SICK;
          obj.data = 5;
          break;
        }
        case "5": {
          obj.name = Moods.ANGRY;
          obj.color = MoodColors.ANGRY;
          obj.data = 15;
          break;
        }
        default:
          break;
      }
      return {
        ...obj,
        // data: moods[i as keyof typeof moods],
      };
    });

    return (
      <View style={styles.chartContainer}>
        <PieChart
          data={mapped}
          height={220}
          width={Dimensions.get("screen").width - 50}
          style={{
            alignItems: "center",
            maxWidth: "100%",
          }}
          center={[75, 0]}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          hasLegend={false}
          accessor="data"
          backgroundColor="transparent"
          paddingLeft="12"
        />
        <View style={styles.legends}>
          {legends.map((l) => (
            <View style={styles.legendWrapper} key={l.name}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  minWidth: "25%",
                  // backgroundColor: "red",
                }}
              >
                <View
                  style={{
                    width: 24,
                    height: 24,
                    backgroundColor: l.color,
                    borderRadius: 50,
                    marginRight: 8,
                  }}
                />
                <Text style={{ minWidth: 50 }}>{l.name}</Text>
              </View>
              <Divider
                style={{ borderWidth: 1, borderColor: "#cacaca", width: "40%" }}
              />
              <Text
                style={{
                  minWidth: "20%",
                  textAlign: "center",
                }}
              >
                {l.data}%
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  return null;
};

export default StatChart;

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24,
  },
  legends: {
    marginTop: 12,
  },
  legendWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    justifyContent: "space-between",
  },
}));

enum MoodColors {
  HAPPY = "#B7EEA1",
  CALM = "#9FA9F2",
  SAD = "#8DE1EE",
  SICK = "#FA9153",
  ANGRY = "#FD524F",
}
