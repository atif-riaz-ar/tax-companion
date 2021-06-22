import React, {useState, useContext} from "react";
import {FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import * as COLOR from "../../styles/constants";
import * as ICON from "../../components/icons";
import NewsContent from "../content/NewsContent";
import Loader from "../../components/loader";

const NewsListing = (props) => {
    let [find, setFind] = useState(true);
    let [data, setData] = useState([]);
    let [fullData, setFullData] = useState([]);
    const [loading, setLoading] = useState(false);


    const [query, setQuery] = useState("");
    let url = "all";
    if (props.data.type === "all") {
        url = "https://leedsng.com/api/asc_rss.php?type=latest";
    }
    if (props.data.type === "business") {
        url = "https://leedsng.com/api/asc_rss.php?type=business";
    }
    if (props.data.type === "politics") {
        url = "https://leedsng.com/api/asc_rss.php?type=politics";
    }

    if (url !== "" && find === true) {
        setFind(false);

        setLoading(true)

        fetch(url, {
            method: "GET",
        }).then((tt) => {
            return tt.json();
        }).then((rss) => {
            setData(rss);
            setFullData(rss);
            setFind(true);
            setLoading(false)

        }).catch(error => {
            setFind(true);
            setLoading(false)
        }).done();
    }

    const handleSearch = text => {
        let filteredData = data.filter(x => String(x.title.toLowerCase()).includes(text.toLowerCase()));
        setFullData(filteredData);
        setQuery(text);
    };

    if (data !== undefined) {
        return (
            <ScrollView style={{
                flex: 1,
                backgroundColor: COLOR.extra_color1,
            }}>
                <Loader loading={loading}/>

                <View
                    style={{
                        backgroundColor: "#fff",
                        padding: 5,
                        marginVertical: 10,
                        marginHorizontal: 12,
                        borderWidth: 1,
                        borderRadius: 5,
                    }}
                >
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        clearButtonMode="always"
                        value={query}
                        onChangeText={queryText => handleSearch(queryText)}
                        placeholder="Search"
                        style={{backgroundColor: "#fff", paddingHorizontal: 20}}
                    />
                </View>
                <FlatList
                    data={fullData}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate("NewsContent", {
                                    item_title: item.title,
                                    item: item,
                                });
                            }}
                            style={{
                                backgroundColor: COLOR.white,
                                paddingVertical: 15,
                                marginVertical: 7,
                                marginHorizontal: 14,
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: COLOR.extra_color2,
                                flex: 1,
                                flexDirection: "row",
                                flexWrap: "wrap",
                                alignItems: "flex-start",
                            }}
                        >
                            <View style={{
                                width: "85%",
                                height: "100%",
                                justifyContent: "center",
                                paddingLeft: 20,
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: COLOR.primary_color,
                                    fontWeight: "bold",
                                }}>{item.title}</Text>
                                <Text style={{
                                    fontSize: 12,
                                    color: COLOR.extra_color4,
                                    textDecorationLine: "underline",
                                    textDecorationStyle: "solid",
                                    textDecorationColor: COLOR.black,
                                    fontWeight: "bold",
                                }}>{item.published}</Text>
                            </View>
                            <View style={{
                                width: "15%",
                                justifyContent: "center",
                                height: "100%",
                                paddingLeft: 15,
                            }}>
                                <ICON.getIcon width={24} height={24} name="goto" color={COLOR.primary_color}/>
                            </View>
                        </TouchableOpacity>

                    )}
                />
            </ScrollView>
        );
    } else {
        return (
            <ScrollView style={{
                flex: 1,
                backgroundColor: COLOR.extra_color3,
            }}>
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <Text style={{
                        color: COLOR.white,
                        fontSize: 20,
                        paddingVertical: 40,
                    }}>No Content Found</Text>
                </View>
            </ScrollView>
        );
    }
};

export default NewsListing;
