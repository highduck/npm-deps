cmake_minimum_required(VERSION 3.13)

project(tracy)
# ${CMAKE_SYSTEM_NAME} MATCHES "Windows"
if (MINGW)

    add_library(${PROJECT_NAME} INTERFACE)
    target_include_directories(${PROJECT_NAME} INTERFACE ./stub)

else ()

    add_library(${PROJECT_NAME} STATIC src/TracyClient.cpp)
    set_target_properties(${PROJECT_NAME} PROPERTIES CXX_STANDARD 17)
    target_include_directories(${PROJECT_NAME} INTERFACE ./src)
    if (TRACY_ENABLE)
        target_compile_options(${PROJECT_NAME} PRIVATE -g)
        target_compile_definitions(${PROJECT_NAME} INTERFACE TRACY_ENABLE)
        add_definitions(-DTRACY_ENABLE)
        if (${CMAKE_SYSTEM_NAME} MATCHES "Linux")
            target_link_libraries(${PROJECT_NAME}
                    PRIVATE -lpthread
                    PRIVATE -ldl)
        elseif (${CMAKE_SYSTEM_NAME} MATCHES "Windows")
            target_link_libraries(${PROJECT_NAME}
                    PRIVATE ws2_32
                    PRIVATE dbghelp
                    )
        endif ()
    endif ()
endif ()

add_library(ekx::${PROJECT_NAME} ALIAS ${PROJECT_NAME})