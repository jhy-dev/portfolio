<template>
<div id="app">
  <v-app id="inspire">
    <v-card height="100%">
      <v-navigation-drawer
        v-model="drawer"
        app
        permanent
        absolute
      >
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="https://cdn-images-1.medium.com/max/1200/1*yh90bW8jL4f8pOTZTvbzqw.png">
              </v-list-tile-avatar>
  
              <v-list-tile-content>
                <v-list-tile-title>GoLang Demo</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-list class="pt-0" dense>
          <v-divider>
          
          

          
          </v-divider>
  
          <v-list-tile
            v-for="item in items"
            :to="item.link"
            :key="item.title"
            @click="navigationclick(item.title)"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>


      </v-navigation-drawer>
        <v-content>
            <main>
              <v-container fluid>
                    <router-view></router-view>
              </v-container>
            </main>      
          </v-content>
    </v-card>


  </v-app>
</div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  },
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Inventory', icon: 'home', link:'/' },
        { title: 'Commission', icon: 'dashboard', link:'/login'  },
        { title: 'Manage Market', icon: 'folder_open', link:'/login'  },
        { title: 'Manage Customer', icon: 'info', link:'/login'  },        
        { title: 'Report Setting', icon: 'widgets', link:'/login'  },
        { title: 'Sign Out', icon: 'gavel', link:'/login'  }        
      ],
      mini: true,
      right: null
    }
  },
  methods:{
    navigationclick(event){
      console.log(event)
    }
  }
}
</script>
