<template>
  <NuxtPage />
</template>

<style lang="scss">
:root {

  --dark-purple: #5C2DD5;
  --purple: #7945FF;
  --pink: #FD6687;
  --yellow: #FFCE67;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  width: 100vw;
  background: var(--bg, #ABBCFF);
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#__nuxt {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  width: 100vw;
  background: var(--bg, #ABBCFF);
  margin: 0;
  padding: 0;
  overflow: hidden;

}
</style>