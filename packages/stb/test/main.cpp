#include <stdio.h>
#include <stdlib.h>

int main(int argc, char* argv[]) {

    printf("library version: %d.%d.%d\n", 0, 0, 1);

    int error = 0;
    if (error) {
        return EXIT_FAILURE;
    }

    return EXIT_SUCCESS;
}