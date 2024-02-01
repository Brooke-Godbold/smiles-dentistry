<template>
  <section :class="$style.notFound" data-cy="not-found">
    <h1 :class="$style.notFoundHeading" data-cy="not-found-heading">404</h1>
    <p :class="$style.notFoundText" data-cy="not-found-text">This doesn't exist</p>
  </section>
</template>

<style src="./NotFound.styles.css" module />
