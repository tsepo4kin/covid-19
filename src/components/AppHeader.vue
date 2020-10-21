<template>
    <div>
        <v-navigation-drawer v-if="drawer" class="primary" dark permanent app>
            <v-list>
                <v-list-item
                    v-for="item in items"
                    :to="item.link"
                    :key="item.title"
                    link
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar color="primary" dense dark app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <router-link to="/" tag='span' style="cursor: pointer">
                <v-toolbar-title class="headline">
                    <v-icon>mdi-virus</v-icon>
                    Covid-19
                </v-toolbar-title>
            </router-link>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-menu left bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                        v-for="country in topCountries"
                        :to="'/country/' + country.country"
                        :key="country.country"
                        link
                    >
                        <v-list-item-title>{{
                            country.country
                        }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    data: () => ({
        drawer: false,
        items: [
            {
                title: "Countries",
                link: "/countries",
                icon: "icon",
            },
        ],
    }),
    mounted() {
        this.$store.dispatch("updateTopCountries");
    },
    computed: {
        topCountries() {
            return this.$store.getters.topCountries;
        },
    },
};
</script>

<style></style>
