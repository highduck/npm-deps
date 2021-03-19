cmake_minimum_required(VERSION 3.13)

project(gtest)
add_library(${PROJECT_NAME} STATIC src/gtest-all.cc)
target_include_directories(${PROJECT_NAME} PUBLIC ./include PRIVATE ./)
set_target_properties(${PROJECT_NAME} PROPERTIES CXX_STANDARD 17)

project(gtest_main)
add_library(${PROJECT_NAME} STATIC src/gtest_main.cc)
target_include_directories(${PROJECT_NAME} PUBLIC ./include)
set_target_properties(${PROJECT_NAME} PROPERTIES CXX_STANDARD 17)

target_link_libraries(gtest_main PUBLIC gtest)
