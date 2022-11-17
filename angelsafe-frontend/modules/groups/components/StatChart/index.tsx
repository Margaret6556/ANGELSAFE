import React, { useEffect, useState } from "react";
import { Animated, Dimensions, ScrollViewProps, View } from "react-native";
import { Divider, makeStyles, Text, useTheme } from "@rneui/themed";
import { useGetGroupChartQuery } from "@/shared/api/stats";
import { Container, Loading } from "@/shared/components";
import { PieChart } from "react-native-chart-kit";
import { Moods } from "@/shared/state/reducers/experience";
import { moderateScale, scale } from "react-native-size-matters";

interface StatChartProps {
  groupId: string;
  animation: Animated.Value;
}

const StatChart = (props: StatChartProps) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const [legends, setLegends] = useState<any[]>([]);
  const { data, isLoading } = useGetGroupChartQuery({
    groupId: props.groupId,
  });

  useEffect(() => {
    if (data?.data) {
      const legend = [
        {
          name: Moods.HAPPY,
          color: MoodColors.HAPPY,
          data: data.data[1],
        },
        {
          name: Moods.CALM,
          color: MoodColors.CALM,
          data: data.data[2],
        },
        {
          name: Moods.SAD,
          color: MoodColors.SAD,
          data: data.data[3],
        },
        {
          name: Moods.SICK,
          color: MoodColors.SICK,
          data: data.data[4],
        },
        {
          name: Moods.ANGRY,
          color: MoodColors.ANGRY,
          data: data.data[5],
        },
      ];
      setLegends(legend);
    }
  }, [data]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 0,
          height: Dimensions.get("screen").height / 2,
        }}
      >
        <Loading />
      </View>
    );
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
          obj.data = moods[i];
          break;
        }
        case "2": {
          obj.name = Moods.CALM;
          obj.color = MoodColors.CALM;
          obj.data = moods[i];
          break;
        }
        case "3": {
          obj.name = Moods.SAD;
          obj.color = MoodColors.SAD;
          obj.data = moods[i];
          break;
        }
        case "4": {
          obj.name = Moods.SICK;
          obj.color = MoodColors.SICK;
          obj.data = moods[i];
          break;
        }
        case "5": {
          obj.name = Moods.ANGRY;
          obj.color = MoodColors.ANGRY;
          obj.data = moods[i];
          break;
        }
        default:
          break;
      }
      return {
        ...obj,
      };
    });

    return (
      <AnimatedScrollContainer
        contentContainerStyle={styles.container}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: props.animation,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
      >
        <PieChart
          data={mapped}
          height={moderateScale(220)}
          width={Dimensions.get("screen").width}
          style={{
            alignItems: "center",
            maxWidth: "100%",
          }}
          center={[Dimensions.get("window").width / 4, 0]}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {},
          }}
          hasLegend={false}
          accessor="data"
          backgroundColor="transparent"
          paddingLeft="0"
        />
        <View style={styles.legends}>
          {legends.map((l) => (
            <View style={styles.legendWrapper} key={l.name}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  minWidth: "25%",
                }}
              >
                <View
                  style={{
                    width: scale(24),
                    height: scale(24),
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
      </AnimatedScrollContainer>
    );
  }

  return null;
};

export default StatChart;

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "flex-start",
    minHeight: Dimensions.get("window").height * 1.4,
  },
  legends: {
    marginTop: theme.spacing.lg,
  },
  legendWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
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

class ScrollContainer extends React.Component<ScrollViewProps> {
  render() {
    return (
      <Container type="scroll" containerProps={{ ...this.props }}>
        {this.props.children}
      </Container>
    );
  }
}

const AnimatedScrollContainer =
  Animated.createAnimatedComponent(ScrollContainer);
