cmake_minimum_required(VERSION 3.17)
project(pugixml)

add_library(${PROJECT_NAME} STATIC
        src/pugixml.cpp
        src/pugixml.hpp
        src/pugiconfig.hpp
        )

target_include_directories(${PROJECT_NAME} PUBLIC ./src)

set_target_properties(${PROJECT_NAME} PROPERTIES
        C_STANDARD 11
        CXX_STANDARD 17
        CXX_STANDARD_REQUIRED YES
        CXX_EXTENSIONS NO
        )

add_library(ekx::${PROJECT_NAME} ALIAS ${PROJECT_NAME})
