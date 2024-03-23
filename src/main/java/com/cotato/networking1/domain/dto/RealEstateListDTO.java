package com.cotato.networking1.domain.dto;

import com.cotato.networking1.domain.entity.RealEstate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class RealEstateListDTO {
    List<RealEstate> realEstates;
}
