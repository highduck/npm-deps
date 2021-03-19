#include <stdio.h>
#include <stdlib.h>

#include <gtest/gtest.h>

TEST(SampleTest, HelloWorld) {
    printf("Google Test package test\n");

    int a = 2;
    int b = 3;
    int c = a + b;

    EXPECT_EQ(c, 5);
}