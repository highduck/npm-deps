cmake_minimum_required(VERSION 3.17)

add_subdirectory(.. package)

project(test-package)
add_executable(${PROJECT_NAME} test.cpp)

set_target_properties(${PROJECT_NAME} PROPERTIES
        C_STANDARD 11
        CXX_STANDARD 17
        CXX_STANDARD_REQUIRED YES
        CXX_EXTENSIONS NO
        )

target_link_libraries(${PROJECT_NAME} PUBLIC gtest_main)

add_executable(test-benchmark benchmark.cpp)
set_target_properties(test-benchmark PROPERTIES
        C_STANDARD 11
        CXX_STANDARD 17
        CXX_STANDARD_REQUIRED YES
        CXX_EXTENSIONS NO
        )

target_link_libraries(test-benchmark PUBLIC benchmark_main)