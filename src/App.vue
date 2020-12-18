<template>
  <center>
    <h1><A ID=main_link HREF='/'>BSB-LAN Web</A></h1>
  </center>
  <table align=center>
    <tr bgcolor=#f0f0f0>
      <td class="header" width=20% align=center>
        <router-link to="/K">Heizungsfunktionen</router-link>
      </td>
      <td class="header" width=20% align=center>
        <a href='/T'>Sensoren</a>
      </td>
      <td class="header" width=20% align=center>
        <font color=#000000>Ausgabe Logdatei</font>
      </td>
      <td class="header" width=20% align=center>
        <a href='/Q'>Prüfe auf neue Parameter</a>
      </td>
    </tr>
    <tr bgcolor=#f0f0f0>
      <td class="header" width=20% align=center>
        <a href='/C'>Einstellungen</a>
      </td>
      <td class="header" width=20% align=center>
        <a href='https://1coderookie.github.io/BSB-LPB-LAN/anhang_b.html' target='_new'>URL-Befehle</a>
      </td>
      <td class="header" width=20% align=center>
        <a href='https://1coderookie.github.io/BSB-LPB-LAN/inhaltsverzeichnis.html' target='new'>Handbuch</a>
      </td>
      <td class="header" width=20% align=center>
        <a href='https://1coderookie.github.io/BSB-LPB-LAN/kap15.html' target='_new'>FAQ</a>
      </td>
    </tr>
  </table>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
