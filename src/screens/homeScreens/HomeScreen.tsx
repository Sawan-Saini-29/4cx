import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Alert, Image, ActivityIndicator } from 'react-native';
import * as IMG_CONST from "../../components/assets";
import ApiService from '../../apiService/apiService';
import moment from 'moment-timezone';

import { BaseballIcon, SoccerBall, TennisBallIcon, CricketIcon, UserCirclePlusIcon, Basketball, FootballIcon, GolfIcon, BoxingGlove, SoccerBallIcon } from "phosphor-react-native"
import Scale, { verticalScale } from '../../components/Scale';
import Loader from '../../components/Loader';

const HomeScreen = () => {

  const [userdata, setUserdata] = useState<any>({
    user: {
      username: String,
      coinsBalance: Number
    }
  });
  const [SportLeagues, setSportLeagues] = useState<Array<string>>([]);
  const [TopTraded, setTopTraded] = useState<any>()
  const [isOpen, setIsOpen] = useState(false)
  const [isSelected, setIsSelected] = useState("")
  const [isSelectedImg, setIsSelectedImg] = useState("")
  const [UpcomingEvent, setUpcomingEvent] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apicalls = async () => {
      setLoading(true);
      try  {
      await getUserData();
      await getSportLeagues();
      await getTopTraded();
      await getUpcomingEvent();
      }
      finally {
       setLoading(false);
      }
    }
    apicalls();
  }, []);

  const getUserData = async () => {
    try {
      const response = await ApiService.get<any>(
        "user/getMe",
        {},
        'json'
      );
      if (response) {
        console.log("@@@ =========== user/getMe", response)
        if (response.data) {
          setUserdata(response.data)
        }
      }
    }
    catch (error: any) {
      Alert.alert("@@@ api error", error)
    }
  };

  const getSportLeagues = async () => {
    try {
      const response = await ApiService.get<any>(
        "exchange/getSportLeagues",
        {},
        'json'
      );
      if (response.data.sportsAvailable) {
        console.log("@@@ =========== exchange/getSportLeagues", response.data)
        const keys = Object.keys(response.data.sportsAvailable);
        setSportLeagues(keys.reverse());
      }
    }
    catch (error: any) {
      Alert.alert("@@@ api error", error)
    }
  }

  const getTopTraded = async () => {
    try {
      const response = await ApiService.get<any>(
        "session/getTopTraded",
        {},
        'json'
      );
      if (response) {
        console.log("@@@ =========== session/getTopTraded", response.data)
        if (response.data) {
          setTopTraded(response.data.topTradedOrderbooks)
        }
      }
    }
    catch (error: any) {
      Alert.alert("@@@ api error", error)
    }
  }

  const getUpcomingEvent = async () => {
    try {
      const response = await ApiService.get<any>(
        "exchange/getUpcomingEvent",
        {},
        'json'
      );
      if (response) {
        console.log("@@@ =========== exchange/getUpcomingEvent", response)
        setUpcomingEvent(response.data.games)
      }
    }
    catch (error: any) {
      Alert.alert("@@@ api error", error)
    }
  }

  const updateCoins = async (playerMode:string) => {
    setIsOpen(!isOpen)
    try {
      const response = await ApiService.post<any>(
        "user/updateCoinsOrCash",
        {
          "playerMode":playerMode
        },
        'json'
      );
      if (response) {
        console.log("@@@ =========== exchange/updateCoins", response)
        await getUserData();
      }
    }
    catch (error: any) {
      Alert.alert("@@@ api error", error)
    }
  }

  const formatToCustom = (isoDate: string): string => {
    const date = moment(isoDate).local(); // Convert from UTC to local device time
    return date.format('h:mma DD MMM').toLowerCase(); // Example: 7:30pm 05 jun
  };

  const iconRender = (icon: string) => {
    return (
      <>
        {icon === "baseball" && <BaseballIcon size={40} color="grey" weight="fill" />}
        {icon === "soccer" && <SoccerBall size={40} color="grey" weight="fill" />}
        {icon === "tennis" && <TennisBallIcon size={40} color="grey" weight="fill" />}
        {icon === "cricket" && <CricketIcon size={40} color="grey" weight="fill" />}
        {icon === "custom" && <UserCirclePlusIcon size={40} color="grey" weight="fill" />}
        {icon === "basketball" && <Basketball size={40} color="grey" weight="duotone" />}
        {icon === "football" && <SoccerBallIcon size={40} color="grey" weight="duotone" />}
        {icon === "golf" && <GolfIcon size={40} color="grey" weight="duotone" />}
        {icon === "fighting" && <BoxingGlove size={40} color="grey" weight="duotone" />}
      </>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Loader  loading={loading}></Loader>
      <View key={1} style={{ padding: Scale(20) }}>
        <View style={{ marginTop: Scale(50), justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "400", fontStyle: "normal", fontSize: 18, color: "#FBFCFF" }}>{userdata?.user?.username}</Text>
          <View style={{ width: Scale(24), height: verticalScale(24) }}>
            <Image source={IMG_CONST.modalCloseImg} resizeMode='contain' style={{ width: Scale(24), height: verticalScale(24) }} />
          </View>
        </View>
        <View style={{ width:Scale(253), height: verticalScale(60), alignItems: "center", alignSelf: "center", marginTop: verticalScale(40) }}>
          <Text style={{ fontSize: 14, fontWeight: "400", color: "#8E8E93" }}>Available Balance</Text>
          <TouchableOpacity onPress={()=>setIsOpen(!isOpen)} style={{ width: Scale(242), height: verticalScale(42), borderRadius: 3, borderWidth: 0.5, marginTop: Scale(5), borderColor: "#E2E0E0", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ width: Scale(25.4), height: verticalScale(17), marginLeft: Scale(10) }}>
              <Image resizeMode="contain" source={userdata?.user?.playerMode == "cash" ?IMG_CONST.cash:IMG_CONST.coins} style={{ width: Scale(25.4), height: verticalScale(17) }} />
            </View>
            <Text style={{ fontSize: 32, fontWeight: "700", textAlign: "center", color: "rgba(255, 255, 255, 1)" }}>{userdata?.user?.displayBalance}</Text>
            <View style={{ width: Scale(10), height: verticalScale(5), marginRight: Scale(10) }}>
              <Image source={IMG_CONST.Vector} style={{ width: Scale(10), height: verticalScale(5) }} />
            </View>
          </TouchableOpacity>
        </View>

        {isOpen == true &&
          <View style={{ width: Scale(242), backgroundColor: "transparent", alignSelf: "center" , borderWidth:Scale(0.5), borderColor:"#fff"}}>
            <TouchableOpacity onPress={()=>userdata?.user?.playerMode == "coins" ? updateCoins("cash") : setIsOpen(!isOpen)} style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: Scale(10), marginRight: Scale(10), alignItems: "center" }}>
              <Text style={{ fontSize: 30, color:"#fff" }}>{userdata?.user?.cashBalance}</Text>
              <Image resizeMode="contain" source={IMG_CONST.cash} style={{ width: Scale(25.4), height: verticalScale(17) }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>userdata?.user?.playerMode == "cash" ? updateCoins("coins") : setIsOpen(!isOpen)} style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: Scale(10), marginRight: Scale(10), alignItems: "center" }}>
              <Text style={{ fontSize: 30, color:"#fff" }}>{userdata?.user?.coinsBalance}</Text>
              <Image resizeMode="contain" source={IMG_CONST.coins} style={{ width: Scale(25.4), height: verticalScale(17) }} />
            </TouchableOpacity>
          </View>}
        <Text style={{ fontWeight: "400", fontSize: Scale(12), textDecorationStyle: "solid", color: "#E2E0E0", textAlign: "center", marginTop: 5, textDecorationLine: "underline" }}>$5,000 potential payout</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.withdrawBtn}>
            <Image source={IMG_CONST.Withdraw} style={{ width: Scale(17.64), height: verticalScale(16), marginRight: Scale(5) }} />
            <Text style={styles.btnText1}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.depositBtn}>
            <Image source={IMG_CONST.Deposit} style={styles.depositBtn} />
          </TouchableOpacity>
        </View>
      </View>
      <View key={2} style={{ width: "100%", height: "100%", backgroundColor: "#232323", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
        <View>
          <FlatList
            contentContainerStyle={{ justifyContent: "space-between", height: verticalScale(81), marginTop: verticalScale(40), }}
            data={SportLeagues}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }: any) => <View style={{ marginHorizontal: Scale(8) }}>
              <View style={{ width: Scale(60), height: Scale(60), borderRadius: 6, backgroundColor: "rgba(60, 60, 67, 0.6)", justifyContent: "center", alignItems: "center" }}>
                {iconRender(item)}
              </View>
              <Text style={styles.sportLabel}>{item}</Text>
            </View>
            }
            keyExtractor={(item: any) => item.id}
          />
        </View>
        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "rgba(255, 255, 255, 1)", left: 15, marginTop: verticalScale(10) }}>Hottest Markets</Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: "700", color: "rgba(98, 195, 112, 1)", right: 15, marginTop: verticalScale(10) }}>View All</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            contentContainerStyle={{ justifyContent: "space-between", }}
            data={TopTraded}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }: any) => {
              console.log("@@@ =========== item", item?.awayMoneylines[0]?.odds)
              return (
                <View style={{
                  width: Scale(220), height: verticalScale(165), borderRadius: 6, borderWidth: 0.5, backgroundColor: "#272727", borderColor: "rgba(217, 217, 217, 0.5)", marginTop: verticalScale(10), justifyContent: "space-evenly",
                  marginHorizontal: 8,
                }}>
                  <View style={{ width: Scale(191.25), height: verticalScale(95.5), alignSelf: "center", justifyContent: "space-between", marginTop: verticalScale(8) }}>
                    <View style={{ width: Scale(191.25), flexDirection: "row", justifyContent: "space-between" }}>
                      <View style={{ width: Scale(65), height: verticalScale(42), borderRadius: 4, backgroundColor: "rgba(35, 35, 35, 1)", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontWeight: "500", fontSize: Scale(14), color: "rgba(251, 252, 255, 1)" }}>{item?.participants[0]?.shortName}</Text>
                      </View>
                      <View style={{ width: Scale(47), height: verticalScale(42), borderRadius: 6, backgroundColor: "rgba(60, 60, 67, 0.6)", justifyContent: "center", alignItems: "center" }}>
                        {iconRender(item.sport)}
                      </View>
                      <View style={{ width: Scale(69), height: verticalScale(42), borderRadius: 4, backgroundColor: "rgba(35, 35, 35, 1)", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontWeight: "500", fontSize: Scale(14), color: "rgba(251, 252, 255, 1)" }}>{item?.participants[1]?.shortName}</Text>
                      </View>
                    </View>
                    <View style={{ width: Scale(191.25), flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <View style={{ width: Scale(65), height: Scale(45), justifyContent: "center", alignItems: "center", borderRadius: 5, borderWidth: 1, borderColor: "rgba(39, 45, 88, 1)", backgroundColor: "rgba(35, 35, 35, 1)" }}>
                        <Text style={{ fontSize: 14, fontWeight: "500", color: "rgba(0, 255, 30, 1)" }}>{item?.awayMoneylines[0]?.odds == undefined ? "+" : item?.awayMoneylines[0]?.odds}</Text>
                      </View>
                      <View style={{ width: Scale(25), height: verticalScale(19) }}>
                        <Image source={IMG_CONST.photo} resizeMode='contain' style={{ width: Scale(18), height: verticalScale(18) }} />
                      </View>
                      <View style={{ width: Scale(69), height: Scale(45), borderRadius: 5, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "rgba(39, 45, 88, 1)", backgroundColor: "rgba(35, 35, 35, 1)" }}>
                        <Text style={{ fontSize: 14, fontWeight: "500", color: "rgba(0, 255, 30, 1)" }}>{item?.homeMoneylines[0]?.odds == undefined ? "+" : item?.homeMoneylines[0]?.odds}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ width: Scale(191.25), height: verticalScale(20), borderRadius: 45, flexDirection: "row", backgroundColor: "rgba(101, 113, 83, 1)", alignSelf: "center", justifyContent: "center", alignItems: "center" }}>
                    <Image source={IMG_CONST.equalizer} style={{ width: Scale(15), height: verticalScale(15), marginRight: Scale(5) }} />
                    <Text style={{ fontWeight: "500", fontSize: 14, marginLeft: Scale(5), color: "rgba(226, 224, 224, 1)" }}>200.3k</Text>
                  </View>
                  <Text style={{ fontSize: 12, fontWeight: 400, color: "rgba(142, 142, 147, 1)", textAlign: "center" }}>{formatToCustom(item?.start)}</Text>
                </View>
              )
            }
            }
            keyExtractor={(item: any) => item.id}
          />
        </View>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "rgba(255, 255, 255, 1)", left: 15, marginTop: verticalScale(20) }}>Starting Soon</Text>
         <FlatList
            contentContainerStyle={{ justifyContent: "space-between", }}
            data={UpcomingEvent}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }: any) => 
               <View style={{ width: Scale(220), padding:Scale(10), height:verticalScale(150),marginHorizontal: Scale(8), borderRadius: 6, borderWidth: 0.5, backgroundColor: "#272727", borderColor: "rgba(217, 217, 217, 0.5)", marginTop: verticalScale(10), justifyContent: "space-evenly",  }}>
                {iconRender(item.sport)}
          <View>
        <Text style={{color:"#fff",}}>{item.eventNameM}</Text>
        <Text style={{color:"#fff",marginTop:5}}>{item.league}</Text>
        </View>
        <Text style={{color:"#fff",marginTop:5}}>{item.timeTo}</Text>
        </View>
            }
            keyExtractor={(item: any) => item.id}
          />
       
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272D58',
  },
  header: {
    marginBottom: Scale(20),
  },
  name: {
    color: '#fff',
    fontSize: 20,
    marginBottom: Scale(10),
  },
  balanceContainer: {
    backgroundColor: '#081C3B',
    padding: Scale(15),
    borderRadius: 8,
    marginBottom: Scale(10),
  },
  balanceText: {
    fontSize: 28,
    color: '#00FF99',
    fontWeight: 'bold',
  },
  payoutText: {
    color: '#a0f0ff',
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: Scale(9),
    marginTop: verticalScale(40),
  },
  withdrawBtn: {
    backgroundColor: '#343B86',
    width: Scale(159),
    height: verticalScale(35),
    borderRadius: Scale(6),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  depositBtn: {
    backgroundColor: '#ffffff',
    width: Scale(159),
    height: verticalScale(35),
    borderRadius: Scale(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#343B86',
    fontWeight: '400',
    fontSize: Scale(16),
  },
  btnText1: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 16,
    marginLeft: Scale(5),
  },
  sportsIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: verticalScale(20),
  },
  sportItem: {
    alignItems: 'center',
  },
  sportLabel: {
    color: '#E2E0E0',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '400',
    marginTop: Scale(5),
  },
  marketSection: {
    marginTop: Scale(20),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Scale(10),
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewAll: {
    color: '#00FF99',
    fontSize: 12,
  },
  marketCard: {
    backgroundColor: '#0D1B3E',
    padding: Scale(15),
    borderRadius: 8,
    marginBottom: Scale(10),
  },
  teamsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teamCode: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  vs: {
    color: '#ccc',
    fontSize: 16,
  },
  odds: {
    color: '#00FF99',
    fontSize: 14,
  },
  volume: {
    color: '#a0f0ff',
    fontSize: 12,
    marginTop: Scale(5),
  },
  time: {
    color: '#ccc',
    fontSize: 12,
    marginTop: Scale(2),
  },
});
