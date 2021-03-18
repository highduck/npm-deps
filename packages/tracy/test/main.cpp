#include <stdio.h>
#include <stdlib.h>

#include <Tracy.hpp>

int main(int argc, char* argv[]) {
    printf("Tracy library\n");
    TracyMessageL("Hello Tracy");
    return EXIT_SUCCESS;
}