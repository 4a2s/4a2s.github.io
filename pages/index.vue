<script setup>

const colorMode = useColorMode()

// Suppression des appels API problématiques et des imports inutilisés

</script>

<template>
    <div
        class="flex flex-col w-full items-start justify-center bg-gradient-to-t from-background to-background via-slate-100 dark:via-secondary ">

        <!-- Hero --->
        <div class="flex flex-col items-center justify-center w-full h-[40vh]">
            <div class="flex flex-col items-center justify-center w-full h-full">
                <div
                    class="flex flex-col items-center justify-center gap-6 w-full h-full max-w-screen-xl text-white p-8 object-contain">
                    <img v-if="colorMode.value == 'dark'" src="/logoFB_white.png" alt="Logo Fréquence Banane"
                        class="object-contain h-full mx-auto" />
                    <img v-else-if="colorMode.value == 'light'" src="/logoFB.png" alt="Logo Fréquence Banane"
                        class="object-contain h-full mx-auto" />
                    <h2
                        class="scroll-m-20 text-2xl font-light tracking-tight lg:text-3xl text-muted-foreground text-center">
                        La radio des étudiant·e·s UNIL-EPFL-UNIGE
                    </h2>
                </div>
            </div>
        </div>

        <!-- Suppression des sections problématiques -->
    </div>
</template>