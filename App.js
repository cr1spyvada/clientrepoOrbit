import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [transactionList, setTransactionList] = useState([
    { type: "Deposit", date: "17th Oct 2022", amt: 45 },
    { type: "Withdraw", date: "16th Oct 2022", amt: 52 },
    { type: "Withdraw", date: "14th Oct 2022", amt: 23 },
  ]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    fetch("https://serverrepoorbit.herokuapp.com/transaction")
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        return setTransactionList(data.transaction);
      })
      .catch((e) => console.log(e, "error"));
  };
  return (
    <View className="bg-gray-200 p-5 flex-1 items-center justify-center">
      <View className="flex flex-row w-full justify-between">
        <Text on className="font-medium">
          Transaction History
        </Text>
        <TouchableOpacity onPress={fetchData}>
          <Text className="font-medium text-purple-500">View All</Text>
        </TouchableOpacity>
      </View>
      <View className="bg-white rounded-lg w-full p-3 drop-shadow-2xl">
        {transactionList
          ? transactionList?.map((transaction, idx) => (
              <View key={idx} className="flex flex-row my-2 items-center">
                <View className="flex-[1]">
                  <Image
                    className="rounded-lg h-6"
                    source={require("./assets/Withdraw.png")}
                  />
                </View>
                <View className="flex flex-[4]">
                  <Text className="font-semi">{transaction.type}</Text>
                  <Text className="font-light text-sm">{transaction.date}</Text>
                </View>
                <Text className="flex-[1]">₹ {transaction.amt}</Text>
              </View>
              // <View className="w-full"/>
            ))
          : null}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
