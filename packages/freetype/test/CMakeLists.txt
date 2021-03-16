cmake_minimum_required(VERSION 3.17)

add_subdirectory(.. freetype2)

project(test-package)
add_executable(${PROJECT_NAME} main.cpp)

set_target_properties(${PROJECT_NAME} PROPERTIES
        C_STANDARD 11
        CXX_STANDARD 17
        CXX_STANDARD_REQUIRED YES
        CXX_EXTENSIONS NO
        )

target_link_libraries(${PROJECT_NAME} PUBLIC freetype2)