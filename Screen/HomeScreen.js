import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';

const HomeScreen = () => {

   const [userdata, setUserdata] = useState('');

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    fetch('https://api.4cx.io/user/getMe', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(async data => {
       await setUserdata(data)
        
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

  }
  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 20 }}>
        <View style={{ marginTop: 73, justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "400", fontStyle: "normal", fontSize: 16, lineHeight: "100%", color: "#FBFCFF" }}>{userdata?.data?.user?.username}</Text>
          <View style={{ width: 24, height: 24, backgroundColor: "red" }}></View>
        </View>
        <View style={{ width: 253, height: 60, alignItems: "center", alignSelf: "center", marginTop: 40 }}>
          <Text style={{ fontSize: 12, fontWeight: "400", lineHeight: "100%", color: "#8E8E93" }}>Available Balance</Text>
          <View style={{ width: 242, height: 42, borderRadius: 3, borderWidth: 0.5, marginTop: 5, borderColor: "#E2E0E0" }}>
            <Text style={{fontSize:32,fontWeight:"700",lineHeight:"100%",textAlign:"center",color:"rgba(255, 255, 255, 1)"}}>{userdata?.data?.user?.coinsBalance}</Text>
          </View>
        </View>
        <Text style={{ fontWeight: "400", fontSize: 12, lineHeight: "100%", textDecorationStyle: "solid", color: "#E2E0E0", textAlign: "center", marginTop: 5, textDecorationLine: "underline" }}>$5,000 potential payout</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.withdrawBtn}>
            <Text style={styles.btnText1}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.depositBtn}>
            <Text style={styles.btnText}>Deposit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ width: "100%", height: "100%", backgroundColor: "#232323", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
        <View>
          <FlatList
            contentContainerStyle={{ justifyContent: "space-between", width: 393, margin: 10, height: 81, marginTop: 40 }}
            data={['NFL', 'NBA', 'NHL', 'MLB', 'PGA',]}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <View>    <View style={{ width: 55.69, height: 55.69, borderRadius: 6, backgroundColor: "rgba(60, 60, 67, 0.6)", }}>
            </View>
              <Text style={styles.sportLabel}>{item}</Text>
            </View>}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: "700", lineHeight: "100%", style: "bold", color: "rgba(255, 255, 255, 1)", left: 15, marginTop: 10 }}>Hottest Markets</Text>
          <Text style={{ fontSize: 16, fontWeight: "700", lineHeight: "100%", style: "bold", color: "rgba(98, 195, 112, 1)", right: 15, marginTop: 10 }}>View All</Text>
        </View>
        <View style={{ width: 220, height: 165, borderRadius: 6, borderWidth: 0.5, backgroundColor: "#272727", borderColor: "rgba(217, 217, 217, 0.5)", marginTop: 10, justifyContent: "space-evenly", left: 15.75 }}>
          <View style={{ width: 191.25, height: 95.5, alignSelf: "center", justifyContent: "space-between", marginTop: 8 }}>
            <View style={{ width: 191.25, flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ width: 69, height: 42, borderRadius: 4, backgroundColor: "rgba(35, 35, 35, 1)" }}>
              </View>
              <View style={{ width: 41.35, height: 42, borderRadius: 6, backgroundColor: "rgba(60, 60, 67, 0.6)" }}></View>
              <View style={{ width: 69, height: 42, borderRadius: 4, backgroundColor: "rgba(35, 35, 35, 1)" }}>
              </View>
            </View>
            <View style={{ width: 191.25, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ width: 69, height: 45, borderRadius: 5, borderWidth: 1, borderColor: "rgba(39, 45, 88, 1)", backgroundColor: "rgba(35, 35, 35, 1)" }}>
              </View>
              <View style={{ width: 25, height: 19, borderRadius: 6, backgroundColor: "rgba(142, 142, 147, 1)" }}></View>
              <View style={{ width: 69, height: 45, borderRadius: 5, borderWidth: 1, borderColor: "rgba(39, 45, 88, 1)", backgroundColor: "rgba(35, 35, 35, 1)" }}>
              </View>
            </View>
          </View>
          <View style={{ width: 191.25, height: 20, borderRadius: 45, backgroundColor: "rgba(101, 113, 83, 1)", alignSelf: "center", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontWeight: "500", fontSize: 14, lineHeight: "100%", color: "rgba(226, 224, 224, 1)" }}>200.3k</Text>
          </View>
          <Text style={{ fontSize: 12, lineHeight: "100%", fontWeight: 400, color: "rgba(142, 142, 147, 1)", textAlign: "center" }}>7:30pm EST 05 JUN</Text>
        </View>
        <Text style={{ fontSize: 16, fontWeight: "700", lineHeight: "100%", style: "bold", color: "rgba(255, 255, 255, 1)", left: 15, marginTop: 20 }}>Starting Soon</Text>
        <View style={{ width: 220, height: 165, borderRadius: 6, borderWidth: 0.5, backgroundColor: "#272727", borderColor: "rgba(217, 217, 217, 0.5)", marginTop: 10, justifyContent: "space-evenly", left: 15.75 }}>
          <View style={{ width: 191.25, height: 95.5, alignSelf: "center", justifyContent: "space-between", marginTop: 8 }}>
            <View style={{ width: 191.25, flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ width: 69, height: 42, borderRadius: 4, backgroundColor: "rgba(35, 35, 35, 1)" }}>
              </View>
              <View style={{ width: 41.35, height: 42, borderRadius: 6, backgroundColor: "rgba(60, 60, 67, 0.6)" }}></View>
              <View style={{ width: 69, height: 42, borderRadius: 4, backgroundColor: "rgba(35, 35, 35, 1)" }}>
              </View>
            </View>
            <View style={{ width: 191.25, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ width: 69, height: 45, borderRadius: 5, borderWidth: 1, borderColor: "rgba(39, 45, 88, 1)", backgroundColor: "rgba(35, 35, 35, 1)" }}>
              </View>
              <View style={{ width: 25, height: 19, borderRadius: 6, backgroundColor: "rgba(142, 142, 147, 1)" }}></View>
              <View style={{ width: 69, height: 45, borderRadius: 5, borderWidth: 1, borderColor: "rgba(39, 45, 88, 1)", backgroundColor: "rgba(35, 35, 35, 1)" }}>
              </View>
            </View>
          </View>
          <View style={{ width: 191.25, height: 20, borderRadius: 45, backgroundColor: "rgba(101, 113, 83, 1)", alignSelf: "center", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontWeight: "500", fontSize: 14, lineHeight: "100%", color: "rgba(226, 224, 224, 1)" }}>200.3k</Text>
          </View>
          <Text style={{ fontSize: 12, lineHeight: "100%", fontWeight: 400, color: "rgba(142, 142, 147, 1)", textAlign: "center" }}>7:30pm EST 05 JUN</Text>
        </View>
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
    marginBottom: 20,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
  },
  balanceContainer: {
    backgroundColor: '#081C3B',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
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
    justifyContent: 'space-between',
    margin: 9,
    marginTop: 40
  },
  withdrawBtn: {
    backgroundColor: '#343B86',
    width: 159,
    height: 44,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: 'center',
  },
  depositBtn: {
    backgroundColor: '#ffffff',
    width: 159,
    height: 44,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: 'center',
  },
  btnText: {
    color: '#343B86',
    fontWeight: '400',
    fontSize: 16
  },
  btnText1: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 16
  },
  sportsIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  sportItem: {
    alignItems: 'center',
  },
  sportLabel: {
    color: '#E2E0E0',
    fontSize: 12,
    textAlign: "center",
    fontWeight: "400",
    marginTop: 5
  },
  marketSection: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
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
    marginTop: 5,
  },
  time: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 2,
  },
});