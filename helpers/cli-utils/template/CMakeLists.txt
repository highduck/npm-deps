cmake_minimum_required(VERSION 3.17)
project(package-template)

add_library(${PROJECT_NAME} STATIC
        src/
        )

target_include_directories(${PROJECT_NAME} PUBLIC
        include
        )

set_target_properties(${PROJECT_NAME} PROPERTIES
        C_STANDARD 11
        CXX_STANDARD 17
        CXX_STANDARD_REQUIRED YES
        CXX_EXTENSIONS NO
        )
