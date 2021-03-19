cmake_minimum_required(VERSION 3.13)

project(tracy)

add_library(${PROJECT_NAME} STATIC src/TracyClient.cpp)
set_target_properties(${PROJECT_NAME} PROPERTIES CXX_STANDARD 17)
target_include_directories(${PROJECT_NAME} INTERFACE ./src)
if (TRACY_ENABLE)
    target_compile_options(${PROJECT_NAME} PRIVATE -g)
    target_compile_definitions(${PROJECT_NAME} INTERFACE TRACY_ENABLE)
    add_definitions(-DTRACY_ENABLE)
endif ()
