<template>
  <main class="container py-8">
    <h1 class="mb-4 text-4xl font-bold text-gray-900">
      Page non trouvée
    </h1>
    <p class="mb-8 text-lg text-gray-600">
      La page que vous recherchez n'existe pas.
    </p>
    <RouterLink
      to="/"
      class="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
    >
      Retour à l'accueil
    </RouterLink>
  </main>
</template>
